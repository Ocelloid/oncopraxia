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
  useDisclosure,
  Spinner,
  Chip,
  Progress,
} from "@heroui/react";
import { api } from "~/trpc/react";

const genders = [
  { key: "male", label: "Мужской", color: "primary" as const },
  { key: "female", label: "Женский", color: "secondary" as const },
];

const ageGroups = [
  "0-19",
  "20-29",
  "30-39",
  "40-49",
  "50-59",
  "60-69",
  "70-79",
  "80+",
];

export default function DemographicsManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedStatisticsId, setSelectedStatisticsId] = useState<
    number | null
  >(null);

  // TRPC запросы
  const { data: statistics } = api.info.getRegionalStatistics.useQuery();
  const {
    data: demographics,
    isLoading,
    refetch,
  } = api.info.getDemographicStatistics.useQuery(
    selectedStatisticsId ? { statisticsId: selectedStatisticsId } : undefined,
  );

  const createMutation = api.info.createDemographicStatistics.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setFormData(initialFormData);
    },
  });
  const updateMutation = api.info.updateDemographicStatistics.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setEditingId(null);
      setFormData(initialFormData);
    },
  });
  const deleteMutation = api.info.deleteDemographicStatistics.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  // Форма
  const initialFormData = {
    statisticsId: selectedStatisticsId ?? 0,
    gender: "male" as const,
    ageGroup: "20-29",
    casesCount: 0,
    percentage: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = () => {
    const submitData = {
      ...formData,
      statisticsId: selectedStatisticsId!,
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

  const handleEdit = (item: NonNullable<typeof demographics>[0]) => {
    if (!item) return;
    setEditingId(item.id);
    setFormData({
      statisticsId: item.statisticsId,
      gender: item.gender as typeof initialFormData.gender,
      ageGroup: item.ageGroup,
      casesCount: item.casesCount,
      percentage: item.percentage,
    });
    onOpen();
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить эту запись?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleCreate = () => {
    if (!selectedStatisticsId) {
      alert("Сначала выберите год статистики");
      return;
    }
    setEditingId(null);
    setFormData({
      ...initialFormData,
      statisticsId: selectedStatisticsId,
    });
    onOpen();
  };

  // Группировка данных по полу и возрасту
  const groupedData = (demographics ?? []).reduce(
    (acc, item) => {
      if (!acc[item.gender]) {
        acc[item.gender] = [];
      }
      acc[item.gender]!.push(item);
      return acc;
    },
    {} as Record<string, NonNullable<typeof demographics>>,
  );

  // Вычисляем проценты по полу
  const genderTotals = Object.entries(groupedData).reduce(
    (acc, [gender, items]) => {
      acc[gender] = (items ?? []).reduce(
        (sum, item) => sum + parseFloat(item.percentage),
        0,
      );
      return acc;
    },
    {} as Record<string, number>,
  );

  const totalPercentage = Object.values(genderTotals).reduce(
    (sum, val) => sum + val,
    0,
  );

  const getGenderLabel = (gender: string) => {
    return genders.find((g) => g.key === gender)?.label ?? gender;
  };

  const getGenderColor = (gender: string) => {
    return genders.find((g) => g.key === gender)?.color ?? "default";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Демографическая статистика
          </h1>
          <p className="text-gray-600">
            Управление статистикой по полу и возрастным группам
          </p>
        </div>
        <Button
          color="primary"
          onPress={handleCreate}
          isLoading={createMutation.isPending}
          isDisabled={!selectedStatisticsId}
        >
          Добавить группу
        </Button>
      </div>

      {/* Выбор года статистики */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-4">
            <Select
              label="Выберите год статистики"
              placeholder="Выберите год"
              selectedKeys={
                selectedStatisticsId ? [selectedStatisticsId.toString()] : []
              }
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                setSelectedStatisticsId(
                  selectedKey ? parseInt(selectedKey) : null,
                );
              }}
              className="max-w-xs"
            >
              {(statistics ?? []).map((stat) => (
                <SelectItem key={stat.id.toString()}>
                  {stat.year} год
                </SelectItem>
              ))}
            </Select>

            {selectedStatisticsId && (
              <div className="flex items-center gap-4">
                <Chip color="primary">
                  Выбран:{" "}
                  {statistics?.find((s) => s.id === selectedStatisticsId)?.year}{" "}
                  год
                </Chip>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Общий процент:</span>
                  <Chip
                    color={
                      totalPercentage === 100
                        ? "success"
                        : totalPercentage > 100
                          ? "danger"
                          : "warning"
                    }
                    size="sm"
                  >
                    {totalPercentage.toFixed(2)}%
                  </Chip>
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Сводка по полу */}
      {selectedStatisticsId && Object.keys(groupedData).length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Object.entries(genderTotals).map(([gender, total]) => (
            <Card key={gender}>
              <CardBody>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Chip color={getGenderColor(gender)} size="sm">
                      {getGenderLabel(gender)}
                    </Chip>
                    <span className="text-sm font-semibold">
                      {total.toFixed(2)}%
                    </span>
                  </div>
                  <Progress
                    value={total}
                    maxValue={100}
                    color={getGenderColor(gender)}
                    className="w-full"
                  />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Таблицы по полу */}
      {selectedStatisticsId && (
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            Object.entries(groupedData).map(([gender, items]) => (
              <Card key={gender}>
                <CardBody>
                  <div className="mb-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <Chip color={getGenderColor(gender)}>
                        {getGenderLabel(gender)}
                      </Chip>
                      <span className="text-gray-500">
                        ({genderTotals[gender]?.toFixed(2)}% от общего)
                      </span>
                    </h3>
                  </div>

                  <Table
                    aria-label={`Таблица демографии - ${getGenderLabel(gender)}`}
                  >
                    <TableHeader>
                      <TableColumn>ВОЗРАСТНАЯ ГРУППА</TableColumn>
                      <TableColumn>СЛУЧАЕВ</TableColumn>
                      <TableColumn>ПРОЦЕНТ</TableColumn>
                      <TableColumn>ДОЛЯ</TableColumn>
                      <TableColumn>ДЕЙСТВИЯ</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {(items ?? [])
                        .sort((a, b) => a.ageGroup.localeCompare(b.ageGroup))
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Chip size="sm" variant="flat">
                                {item.ageGroup} лет
                              </Chip>
                            </TableCell>
                            <TableCell>
                              {item.casesCount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Chip
                                size="sm"
                                color={getGenderColor(gender)}
                                variant="flat"
                              >
                                {parseFloat(item.percentage).toFixed(2)}%
                              </Chip>
                            </TableCell>
                            <TableCell>
                              <Progress
                                value={parseFloat(item.percentage)}
                                maxValue={Math.max(
                                  genderTotals[gender] ?? 0,
                                  50,
                                )}
                                color={getGenderColor(gender)}
                                size="sm"
                                className="w-20"
                              />
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
            ))
          )}
        </div>
      )}

      {!selectedStatisticsId && (
        <Card>
          <CardBody>
            <div className="py-8 text-center text-gray-500">
              Выберите год статистики для просмотра демографических данных
            </div>
          </CardBody>
        </Card>
      )}

      {selectedStatisticsId &&
        Object.keys(groupedData).length === 0 &&
        !isLoading && (
          <Card>
            <CardBody>
              <div className="py-8 text-center text-gray-500">
                Нет демографических данных для выбранного года
              </div>
            </CardBody>
          </Card>
        )}

      {/* Модальное окно для создания/редактирования */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {editingId
              ? "Редактировать демографические данные"
              : "Добавить демографическую группу"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  label="Пол"
                  selectedKeys={[formData.gender]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    setFormData({
                      ...formData,
                      gender: selectedKey as typeof formData.gender,
                    });
                  }}
                  isRequired
                >
                  {genders.map((gender) => (
                    <SelectItem key={gender.key}>{gender.label}</SelectItem>
                  ))}
                </Select>

                <Select
                  label="Возрастная группа"
                  selectedKeys={[formData.ageGroup]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    setFormData({ ...formData, ageGroup: selectedKey });
                  }}
                  isRequired
                >
                  {ageGroups.map((age) => (
                    <SelectItem key={age}>{age} лет</SelectItem>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Количество случаев"
                  type="number"
                  value={formData.casesCount.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      casesCount: parseInt(e.target.value) || 0,
                    })
                  }
                  isRequired
                />

                <Input
                  label="Процент (%)"
                  type="number"
                  step="0.01"
                  value={formData.percentage}
                  onChange={(e) =>
                    setFormData({ ...formData, percentage: e.target.value })
                  }
                  isRequired
                />
              </div>

              <div className="space-y-1 text-sm text-gray-500">
                <p>
                  <strong>Год статистики:</strong>{" "}
                  {statistics?.find((s) => s.id === selectedStatisticsId)?.year}
                </p>
                <p>
                  <strong>Текущая сумма процентов:</strong>{" "}
                  {totalPercentage.toFixed(2)}%
                </p>
                <p>
                  <strong>
                    Текущий процент по полу ({getGenderLabel(formData.gender)}):
                  </strong>{" "}
                  {(genderTotals[formData.gender] ?? 0).toFixed(2)}%
                </p>
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
