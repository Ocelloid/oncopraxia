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

const instructionTypes = [
  { key: "diagnosis", label: "Диагностика" },
  { key: "treatment", label: "Лечение" },
  { key: "screening", label: "Скрининг" },
];

const instructionTypeColors = {
  diagnosis: "primary",
  treatment: "success",
  screening: "warning",
} as const;

export default function InstructionsManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingId, setEditingId] = useState<number | null>(null);

  // TRPC запросы
  const {
    data: instructions,
    isLoading,
    refetch,
  } = api.info.getPatientInstructions.useQuery();
  const createMutation = api.info.createPatientInstruction.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setFormData(initialFormData);
    },
  });
  const updateMutation = api.info.updatePatientInstruction.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setEditingId(null);
      setFormData(initialFormData);
    },
  });
  const deleteMutation = api.info.deletePatientInstruction.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  // Форма
  const initialFormData = {
    stepNumber: 1,
    title: "",
    description: "",
    instructionType: "diagnosis" as const,
    isActive: true,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = () => {
    const submitData = {
      ...formData,
      description: formData.description || undefined,
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

  const handleEdit = (item: NonNullable<typeof instructions>[0]) => {
    if (!item) return;
    setEditingId(item.id);
    setFormData({
      stepNumber: item.stepNumber,
      title: item.title,
      description: item.description ?? "",
      instructionType:
        item.instructionType as typeof initialFormData.instructionType,
      isActive: item.isActive,
    });
    onOpen();
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить эту инструкцию?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    // Найти максимальный номер шага для текущего типа
    const maxStep = Math.max(
      0,
      ...(instructions ?? [])
        .filter((i) => i.instructionType === formData.instructionType)
        .map((i) => i.stepNumber),
    );
    setFormData({
      ...initialFormData,
      stepNumber: maxStep + 1,
    });
    onOpen();
  };

  // Группировка инструкций по типам
  const groupedInstructions = (instructions ?? []).reduce(
    (acc, instruction) => {
      const type = instruction.instructionType;
      acc[type] ??= [];
      acc[type].push(instruction);
      return acc;
    },
    {} as Record<string, typeof instructions>,
  );

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
            Инструкции для пациентов
          </h1>
          <p className="text-gray-600">Управление пошаговыми руководствами</p>
        </div>
        <Button
          color="primary"
          onPress={handleCreate}
          isLoading={createMutation.isPending}
        >
          Добавить инструкцию
        </Button>
      </div>

      {/* Отображение по типам */}
      {instructionTypes.map((type) => {
        const typeInstructions = groupedInstructions[type.key] ?? [];
        if (typeInstructions.length === 0) return null;

        return (
          <Card key={type.key}>
            <CardBody>
              <div className="mb-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Chip
                    color={
                      instructionTypeColors[
                        type.key as keyof typeof instructionTypeColors
                      ]
                    }
                  >
                    {type.label}
                  </Chip>
                  <span className="text-gray-500">
                    ({typeInstructions.length} инструкций)
                  </span>
                </h3>
              </div>

              <Table aria-label={`Таблица инструкций - ${type.label}`}>
                <TableHeader>
                  <TableColumn>ШАГ</TableColumn>
                  <TableColumn>НАЗВАНИЕ</TableColumn>
                  <TableColumn>ОПИСАНИЕ</TableColumn>
                  <TableColumn>СТАТУС</TableColumn>
                  <TableColumn>ДЕЙСТВИЯ</TableColumn>
                </TableHeader>
                <TableBody>
                  {typeInstructions
                    .sort((a, b) => a.stepNumber - b.stepNumber)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Chip size="sm" variant="flat">
                            {item.stepNumber}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold">{item.title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate text-sm text-gray-500">
                            {item.description}
                          </div>
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
        );
      })}

      {/* Если нет инструкций */}
      {Object.keys(groupedInstructions).length === 0 && (
        <Card>
          <CardBody>
            <div className="py-8 text-center text-gray-500">
              Нет добавленных инструкций
            </div>
          </CardBody>
        </Card>
      )}

      {/* Модальное окно для создания/редактирования */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>
            {editingId ? "Редактировать инструкцию" : "Добавить инструкцию"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  label="Тип инструкции"
                  selectedKeys={[formData.instructionType]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    setFormData({
                      ...formData,
                      instructionType:
                        selectedKey as typeof formData.instructionType,
                    });
                  }}
                >
                  {instructionTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>

                <Input
                  label="Номер шага"
                  type="number"
                  value={formData.stepNumber.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stepNumber: parseInt(e.target.value) || 1,
                    })
                  }
                  isRequired
                />
              </div>

              <Input
                label="Название шага"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                isRequired
              />

              <Textarea
                label="Подробное описание"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Детальная инструкция для пациента"
                minRows={4}
              />

              <div className="flex items-center gap-2">
                <Switch
                  isSelected={formData.isActive}
                  onValueChange={(value) =>
                    setFormData({ ...formData, isActive: value })
                  }
                />
                <span className="text-sm">Активная инструкция</span>
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
