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

const achievementTypes = [
  { key: "award", label: "Награда" },
  { key: "ranking", label: "Рейтинг" },
  { key: "infrastructure", label: "Инфраструктура" },
  { key: "quality", label: "Качество" },
];

const achievementTypeColors = {
  award: "warning",
  ranking: "success",
  infrastructure: "primary",
  quality: "secondary",
} as const;

export default function AchievementsManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingId, setEditingId] = useState<number | null>(null);

  // TRPC запросы
  const {
    data: achievements,
    isLoading,
    refetch,
  } = api.info.getAchievements.useQuery();
  const createMutation = api.info.createAchievement.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setFormData(initialFormData);
    },
  });
  const updateMutation = api.info.updateAchievement.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setEditingId(null);
      setFormData(initialFormData);
    },
  });
  const deleteMutation = api.info.deleteAchievement.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  // Форма
  const initialFormData = {
    title: "",
    description: "",
    year: new Date().getFullYear(),
    achievementType: "award" as const,
    value: "",
    isActive: true,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = () => {
    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        data: formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (item: NonNullable<typeof achievements>[0]) => {
    if (!item) return;
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description ?? "",
      year: item.year ?? new Date().getFullYear(),
      achievementType:
        item.achievementType as typeof initialFormData.achievementType,
      value: item.value ?? "",
      isActive: item.isActive,
    });
    onOpen();
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить это достижение?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData(initialFormData);
    onOpen();
  };

  const getTypeLabel = (type: string) => {
    return achievementTypes.find((t) => t.key === type)?.label ?? type;
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
          <h1 className="text-2xl font-bold text-gray-900">Достижения</h1>
          <p className="text-gray-600">
            Управление наградами и достижениями региона
          </p>
        </div>
        <Button
          color="primary"
          onPress={handleCreate}
          isLoading={createMutation.isPending}
        >
          Добавить достижение
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table aria-label="Таблица достижений">
            <TableHeader>
              <TableColumn>НАЗВАНИЕ</TableColumn>
              <TableColumn>ТИП</TableColumn>
              <TableColumn>ГОД</TableColumn>
              <TableColumn>ЗНАЧЕНИЕ</TableColumn>
              <TableColumn>СТАТУС</TableColumn>
              <TableColumn>ДЕЙСТВИЯ</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Нет данных">
              {(achievements ?? []).map((item) => (
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
                        achievementTypeColors[
                          item.achievementType as keyof typeof achievementTypeColors
                        ]
                      }
                      size="sm"
                    >
                      {getTypeLabel(item.achievementType)}
                    </Chip>
                  </TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.value}</TableCell>
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
            {editingId ? "Редактировать достижение" : "Добавить достижение"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Название достижения"
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
                placeholder="Подробное описание достижения"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  label="Тип достижения"
                  selectedKeys={[formData.achievementType]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    setFormData({
                      ...formData,
                      achievementType:
                        selectedKey as typeof formData.achievementType,
                    });
                  }}
                >
                  {achievementTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>

                <Input
                  label="Год"
                  type="number"
                  value={formData.year.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <Input
                label="Значение достижения"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                placeholder="Например: TOP-5, 98%, Золотая медаль"
              />

              <div className="flex items-center gap-2">
                <Switch
                  isSelected={formData.isActive}
                  onValueChange={(value) =>
                    setFormData({ ...formData, isActive: value })
                  }
                />
                <span className="text-sm">Активное достижение</span>
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
