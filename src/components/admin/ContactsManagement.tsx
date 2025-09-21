"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Select,
  SelectItem,
  Switch,
  useDisclosure,
  Spinner,
  Chip,
} from "@heroui/react";
import { api } from "~/trpc/react";

const contactTypes = [
  { key: "hotline", label: "Горячая линия" },
  { key: "emergency", label: "Экстренная помощь" },
  { key: "general", label: "Общая информация" },
];

const contactTypeColors = {
  hotline: "warning",
  emergency: "danger",
  general: "primary",
} as const;

export default function ContactsManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingId, setEditingId] = useState<number | null>(null);

  // TRPC запросы
  const {
    data: contacts,
    isLoading,
    refetch,
  } = api.info.getContactInfo.useQuery();
  const createMutation = api.info.createContactInfo.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setFormData(initialFormData);
    },
  });
  const updateMutation = api.info.updateContactInfo.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setEditingId(null);
      setFormData(initialFormData);
    },
  });
  const deleteMutation = api.info.deleteContactInfo.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  // Форма
  const initialFormData = {
    title: "",
    description: "",
    contactType: "general" as const,
    phone: "",
    email: "",
    website: "",
    workingHours: "",
    isActive: true,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = () => {
    const submitData = {
      ...formData,
      description: formData.description || undefined,
      phone: formData.phone || undefined,
      email: formData.email || undefined,
      website: formData.website || undefined,
      workingHours: formData.workingHours || undefined,
    };

    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        data: submitData,
      });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (item: NonNullable<typeof contacts>[0]) => {
    if (!item) return;
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description ?? "",
      contactType: item.contactType as typeof initialFormData.contactType,
      phone: item.phone ?? "",
      email: item.email ?? "",
      website: item.website ?? "",
      workingHours: item.workingHours ?? "",
      isActive: item.isActive,
    });
    onOpen();
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить этот контакт?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData(initialFormData);
    onOpen();
  };

  const getTypeLabel = (type: string) => {
    return contactTypes.find((t) => t.key === type)?.label ?? type;
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Контактная информация
          </h1>
          <p className="text-gray-600">
            Управление контактными данными для пациентов
          </p>
        </div>
        <Button
          color="primary"
          onPress={handleCreate}
          isLoading={createMutation.isPending}
        >
          Добавить контакт
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table aria-label="Таблица контактной информации">
            <TableHeader>
              <TableColumn>НАЗВАНИЕ</TableColumn>
              <TableColumn>ТИП</TableColumn>
              <TableColumn>ТЕЛЕФОН</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>ЧАСЫ РАБОТЫ</TableColumn>
              <TableColumn>СТАТУС</TableColumn>
              <TableColumn>ДЕЙСТВИЯ</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Нет данных">
              {(contacts ?? []).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      {item.description && (
                        <div className="max-w-xs truncate text-sm text-gray-500">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={
                        contactTypeColors[
                          item.contactType as keyof typeof contactTypeColors
                        ]
                      }
                      size="sm"
                    >
                      {getTypeLabel(item.contactType)}
                    </Chip>
                  </TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.workingHours}</TableCell>
                  <TableCell>
                    <Chip
                      color={item.isActive ? "success" : "default"}
                      variant="flat"
                      size="sm"
                    >
                      {item.isActive ? "Активно" : "Неактивно"}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        onPress={() => handleEdit(item)}
                      >
                        Изменить
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => handleDelete(item.id)}
                        isLoading={deleteMutation.isPending}
                      >
                        Удалить
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Модальное окно для создания/редактирования */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>
            {editingId ? "Редактировать контакт" : "Добавить контакт"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Название контакта"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                isRequired
              />

              <Textarea
                label="Описание"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Дополнительная информация о контакте"
              />

              <Select
                label="Тип контакта"
                selectedKeys={[formData.contactType]}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  setFormData({
                    ...formData,
                    contactType: selectedKey as typeof formData.contactType,
                  });
                }}
              >
                {contactTypes.map((type) => (
                  <SelectItem key={type.key}>{type.label}</SelectItem>
                ))}
              </Select>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Телефон"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+7 (XXX) XXX-XX-XX"
                />

                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="example@domain.com"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Веб-сайт"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="https://example.com"
                />

                <Input
                  label="Часы работы"
                  value={formData.workingHours}
                  onChange={(e) =>
                    setFormData({ ...formData, workingHours: e.target.value })
                  }
                  placeholder="Пн-Пт 9:00-18:00"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  isSelected={formData.isActive}
                  onValueChange={(value) =>
                    setFormData({ ...formData, isActive: value })
                  }
                />
                <span className="text-sm">Активный контакт</span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Отмена
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              isLoading={createMutation.isPending || updateMutation.isPending}
            >
              {editingId ? "Обновить" : "Создать"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
