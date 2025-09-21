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

export default function CancerTypesManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedStatisticsId, setSelectedStatisticsId] = useState<
    number | null
  >(null);

  // TRPC запросы
  const { data: statistics } = api.info.getRegionalStatistics.useQuery();
  const {
    data: cancerTypes,
    isLoading,
    refetch,
  } = api.info.getCancerTypeStatistics.useQuery(
    selectedStatisticsId ? { statisticsId: selectedStatisticsId } : undefined,
  );

  const createMutation = api.info.createCancerTypeStatistics.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setFormData(initialFormData);
    },
  });
  const updateMutation = api.info.updateCancerTypeStatistics.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setEditingId(null);
      setFormData(initialFormData);
    },
  });
  const deleteMutation = api.info.deleteCancerTypeStatistics.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  // Форма
  const initialFormData = {
    statisticsId: selectedStatisticsId ?? 0,
    cancerType: "",
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

  const handleEdit = (item: NonNullable<typeof cancerTypes>[0]) => {
    if (!item) return;
    setEditingId(item.id);
    setFormData({
      statisticsId: item.statisticsId,
      cancerType: item.cancerType,
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

  // Вычисляем общий процент
  const totalPercentage = (cancerTypes ?? []).reduce((sum, item) => {
    return sum + parseFloat(item.percentage);
  }, 0);

  // Предустановленные типы рака
  const commonCancerTypes = [
    "Рак молочной железы",
    "Рак легкого",
    "Колоректальный рак",
    "Рак желудка",
    "Рак предстательной железы",
    "Рак кожи",
    "Рак почки",
    "Рак мочевого пузыря",
    "Рак щитовидной железы",
    "Лимфомы",
    "Лейкозы",
    "Другие виды рака",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Статистика по видам рака
          </h1>
          <p className="text-gray-600">
            Управление статистикой по типам онкологических заболеваний
          </p>
        </div>
        <Button
          color="primary"
          onPress={handleCreate}
          isLoading={createMutation.isPending}
          isDisabled={!selectedStatisticsId}
        >
          Добавить тип рака
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

      {/* Индикатор процентов */}
      {selectedStatisticsId && (cancerTypes ?? []).length > 0 && (
        <Card>
          <CardBody>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Проверка суммы процентов
                </span>
                <span className="text-sm">
                  {totalPercentage.toFixed(2)}% / 100%
                </span>
              </div>
              <Progress
                value={totalPercentage}
                maxValue={100}
                color={
                  totalPercentage === 100
                    ? "success"
                    : totalPercentage > 100
                      ? "danger"
                      : "warning"
                }
                className="w-full"
              />
              {totalPercentage !== 100 && (
                <p className="text-sm text-gray-600">
                  {totalPercentage < 100
                    ? `Не хватает ${(100 - totalPercentage).toFixed(2)}%`
                    : `Превышение на ${(totalPercentage - 100).toFixed(2)}%`}
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Таблица видов рака */}
      {selectedStatisticsId && (
        <Card>
          <CardBody>
            {isLoading ? (
              <div className="flex h-32 items-center justify-center">
                <Spinner size="lg" />
              </div>
            ) : (
              <Table aria-label="Таблица статистики по видам рака">
                <TableHeader>
                  <TableColumn>ВИД РАКА</TableColumn>
                  <TableColumn>СЛУЧАЕВ</TableColumn>
                  <TableColumn>ПРОЦЕНТ</TableColumn>
                  <TableColumn>ДОЛЯ</TableColumn>
                  <TableColumn>ДЕЙСТВИЯ</TableColumn>
                </TableHeader>
                <TableBody emptyContent="Нет данных для выбранного года">
                  {(cancerTypes ?? [])
                    .sort(
                      (a, b) =>
                        parseFloat(b.percentage) - parseFloat(a.percentage),
                    )
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="font-semibold">{item.cancerType}</div>
                        </TableCell>
                        <TableCell>
                          {item.casesCount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip size="sm" color="primary" variant="flat">
                            {parseFloat(item.percentage).toFixed(2)}%
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Progress
                            value={parseFloat(item.percentage)}
                            maxValue={100}
                            color="primary"
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
            )}
          </CardBody>
        </Card>
      )}

      {!selectedStatisticsId && (
        <Card>
          <CardBody>
            <div className="py-8 text-center text-gray-500">
              Выберите год статистики для просмотра данных по видам рака
            </div>
          </CardBody>
        </Card>
      )}

      {/* Модальное окно для создания/редактирования */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {editingId
              ? "Редактировать данные по виду рака"
              : "Добавить вид рака"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Select
                label="Тип рака"
                placeholder="Выберите или введите тип"
                selectedKeys={formData.cancerType ? [formData.cancerType] : []}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  setFormData({ ...formData, cancerType: selectedKey });
                }}
                isRequired
              >
                {commonCancerTypes.map((type) => (
                  <SelectItem key={type}>{type}</SelectItem>
                ))}
              </Select>

              <Input
                label="Или введите свой тип рака"
                value={formData.cancerType}
                onChange={(e) =>
                  setFormData({ ...formData, cancerType: e.target.value })
                }
                placeholder="Введите название типа рака"
              />

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
                {totalPercentage + parseFloat(formData.percentage || "0") >
                  100 && (
                  <p className="text-red-600">
                    <strong>Внимание:</strong> Сумма превысит 100% (
                    {(
                      totalPercentage + parseFloat(formData.percentage || "0")
                    ).toFixed(2)}
                    %)
                  </p>
                )}
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
