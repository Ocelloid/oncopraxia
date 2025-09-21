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
  Select,
  SelectItem,
  Switch,
  useDisclosure,
  Spinner,
  Chip,
} from "@heroui/react";
import { api } from "~/trpc/react";

const facilityTypes = [
  { key: "primary_oncology", label: "Первичный онкологический кабинет" },
  { key: "early_detection", label: "Кабинет раннего выявления" },
  { key: "caop", label: "ЦАОП" },
  { key: "main_dispensary", label: "Главный диспансер" },
];

const facilityTypeColors = {
  primary_oncology: "primary",
  early_detection: "success",
  caop: "warning",
  main_dispensary: "secondary",
} as const;

export default function FacilitiesManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingId, setEditingId] = useState<number | null>(null);

  // TRPC запросы
  const {
    data: facilities,
    isLoading,
    refetch,
  } = api.info.getMedicalFacilities.useQuery();
  const createMutation = api.info.createMedicalFacility.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setFormData(initialFormData);
    },
  });
  const updateMutation = api.info.updateMedicalFacility.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setEditingId(null);
      setFormData(initialFormData);
    },
  });
  const deleteMutation = api.info.deleteMedicalFacility.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  // Форма
  const initialFormData = {
    name: "",
    facilityType: "primary_oncology" as const,
    address: "",
    phone: "",
    city: "",
    isActive: true,
    annualVisits: 0,
    staffCount: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = () => {
    const submitData = {
      ...formData,
      annualVisits: formData.annualVisits || undefined,
      staffCount: formData.staffCount || undefined,
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

  const handleEdit = (item: NonNullable<typeof facilities>[0]) => {
    if (!item) return;
    setEditingId(item.id);
    setFormData({
      name: item.name,
      facilityType: item.facilityType as typeof initialFormData.facilityType,
      address: item.address ?? "",
      phone: item.phone ?? "",
      city: item.city ?? "",
      isActive: item.isActive,
      annualVisits: item.annualVisits ?? 0,
      staffCount: item.staffCount ?? 0,
    });
    onOpen();
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить это учреждение?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData(initialFormData);
    onOpen();
  };

  const getTypeLabel = (type: string) => {
    return facilityTypes.find((t) => t.key === type)?.label ?? type;
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
            Медицинские учреждения
          </h1>
          <p className="text-gray-600">
            Управление медицинскими учреждениями региона
          </p>
        </div>
        <Button
          color="primary"
          onPress={handleCreate}
          isLoading={createMutation.isPending}
        >
          Добавить учреждение
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table aria-label="Таблица медицинских учреждений">
            <TableHeader>
              <TableColumn>НАЗВАНИЕ</TableColumn>
              <TableColumn>ТИП</TableColumn>
              <TableColumn>ГОРОД</TableColumn>
              <TableColumn>ТЕЛЕФОН</TableColumn>
              <TableColumn>ПОСЕЩЕНИЯ/ГОД</TableColumn>
              <TableColumn>СТАТУС</TableColumn>
              <TableColumn>ДЕЙСТВИЯ</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Нет данных">
              {(facilities ?? []).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      {item.address && (
                        <div className="max-w-xs truncate text-sm text-gray-500">
                          {item.address}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={
                        facilityTypeColors[
                          item.facilityType as keyof typeof facilityTypeColors
                        ]
                      }
                      size="sm"
                    >
                      {getTypeLabel(item.facilityType)}
                    </Chip>
                  </TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    {item.annualVisits
                      ? item.annualVisits.toLocaleString()
                      : "—"}
                  </TableCell>
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
            {editingId ? "Редактировать учреждение" : "Добавить учреждение"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Название учреждения"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                isRequired
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  label="Тип учреждения"
                  selectedKeys={[formData.facilityType]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    setFormData({
                      ...formData,
                      facilityType: selectedKey as typeof formData.facilityType,
                    });
                  }}
                >
                  {facilityTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>

                <Input
                  label="Город"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>

              <Input
                label="Адрес"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />

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
                  label="Количество сотрудников"
                  type="number"
                  value={formData.staffCount.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      staffCount: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <Input
                label="Годовое количество посещений"
                type="number"
                value={formData.annualVisits.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    annualVisits: parseInt(e.target.value) || 0,
                  })
                }
              />

              <div className="flex items-center gap-2">
                <Switch
                  isSelected={formData.isActive}
                  onValueChange={(value) =>
                    setFormData({ ...formData, isActive: value })
                  }
                />
                <span className="text-sm">Активное учреждение</span>
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
