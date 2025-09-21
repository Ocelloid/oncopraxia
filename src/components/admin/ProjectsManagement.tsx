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

const projectTypes = [
  { key: "screening", label: "Скрининг" },
  { key: "infrastructure", label: "Инфраструктура" },
  { key: "education", label: "Образование" },
];

const projectTypeColors = {
  screening: "success",
  infrastructure: "primary",
  education: "warning",
} as const;

export default function ProjectsManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingId, setEditingId] = useState<number | null>(null);

  // TRPC запросы
  const {
    data: projects,
    isLoading,
    refetch,
  } = api.info.getRegionalProjects.useQuery();
  const createMutation = api.info.createRegionalProject.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setFormData(initialFormData);
    },
  });
  const updateMutation = api.info.updateRegionalProject.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setEditingId(null);
      setFormData(initialFormData);
    },
  });
  const deleteMutation = api.info.deleteRegionalProject.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  // Форма
  const initialFormData = {
    name: "",
    description: "",
    projectType: "screening" as const,
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear(),
    website: "",
    isActive: true,
    participantsCount: 0,
    detectedCases: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = () => {
    const submitData = {
      ...formData,
      description: formData.description || undefined,
      startYear: formData.startYear || undefined,
      endYear: formData.endYear || undefined,
      website: formData.website || undefined,
      participantsCount: formData.participantsCount || undefined,
      detectedCases: formData.detectedCases || undefined,
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

  const handleEdit = (item: NonNullable<typeof projects>[0]) => {
    if (!item) return;
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description ?? "",
      projectType: item.projectType as typeof initialFormData.projectType,
      startYear: item.startYear ?? new Date().getFullYear(),
      endYear: item.endYear ?? new Date().getFullYear(),
      website: item.website ?? "",
      isActive: item.isActive,
      participantsCount: item.participantsCount ?? 0,
      detectedCases: item.detectedCases ?? 0,
    });
    onOpen();
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить этот проект?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData(initialFormData);
    onOpen();
  };

  const getTypeLabel = (type: string) => {
    return projectTypes.find((t) => t.key === type)?.label ?? type;
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
            Региональные проекты
          </h1>
          <p className="text-gray-600">
            Управление программами и проектами региона
          </p>
        </div>
        <Button
          color="primary"
          onPress={handleCreate}
          isLoading={createMutation.isPending}
        >
          Добавить проект
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table aria-label="Таблица региональных проектов">
            <TableHeader>
              <TableColumn>НАЗВАНИЕ</TableColumn>
              <TableColumn>ТИП</TableColumn>
              <TableColumn>ПЕРИОД</TableColumn>
              <TableColumn>УЧАСТНИКИ</TableColumn>
              <TableColumn>ВЫЯВЛЕНО</TableColumn>
              <TableColumn>СТАТУС</TableColumn>
              <TableColumn>ДЕЙСТВИЯ</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Нет данных">
              {(projects ?? []).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-semibold">{item.name}</div>
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
                        projectTypeColors[
                          item.projectType as keyof typeof projectTypeColors
                        ]
                      }
                      size="sm"
                    >
                      {getTypeLabel(item.projectType)}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {item.startYear}
                    {item.endYear &&
                      item.endYear !== item.startYear &&
                      ` - ${item.endYear}`}
                  </TableCell>
                  <TableCell>
                    {item.participantsCount
                      ? item.participantsCount.toLocaleString()
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {item.detectedCases
                      ? item.detectedCases.toLocaleString()
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
            {editingId ? "Редактировать проект" : "Добавить проект"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Название проекта"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                isRequired
              />

              <Textarea
                label="Описание"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Подробное описание проекта"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Select
                  label="Тип проекта"
                  selectedKeys={[formData.projectType]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    setFormData({
                      ...formData,
                      projectType: selectedKey as typeof formData.projectType,
                    });
                  }}
                >
                  {projectTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>

                <Input
                  label="Год начала"
                  type="number"
                  value={formData.startYear.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      startYear: parseInt(e.target.value) || 0,
                    })
                  }
                />

                <Input
                  label="Год окончания"
                  type="number"
                  value={formData.endYear.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      endYear: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <Input
                label="Веб-сайт проекта"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://example.com"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Количество участников"
                  type="number"
                  value={formData.participantsCount.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      participantsCount: parseInt(e.target.value) || 0,
                    })
                  }
                />

                <Input
                  label="Выявлено случаев"
                  type="number"
                  value={formData.detectedCases.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      detectedCases: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  isSelected={formData.isActive}
                  onValueChange={(value) =>
                    setFormData({ ...formData, isActive: value })
                  }
                />
                <span className="text-sm">Активный проект</span>
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
