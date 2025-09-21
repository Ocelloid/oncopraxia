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
} from "@heroui/react";
import { api } from "~/trpc/react";

export default function CitiesManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedStatisticsId, setSelectedStatisticsId] = useState<
    number | null
  >(null);

  // TRPC запросы
  const { data: statistics } = api.info.getRegionalStatistics.useQuery();
  const {
    data: cities,
    isLoading,
    refetch,
  } = api.info.getCityStatistics.useQuery(
    selectedStatisticsId ? { statisticsId: selectedStatisticsId } : undefined,
  );

  const createMutation = api.info.createCityStatistics.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setFormData(initialFormData);
    },
  });
  const updateMutation = api.info.updateCityStatistics.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setEditingId(null);
      setFormData(initialFormData);
    },
  });
  const deleteMutation = api.info.deleteCityStatistics.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  // Форма
  const initialFormData = {
    statisticsId: selectedStatisticsId ?? 0,
    cityName: "",
    casesCount: 0,
    population: 0,
    incidenceRate: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = () => {
    const submitData = {
      ...formData,
      statisticsId: selectedStatisticsId!,
      population: formData.population || undefined,
      incidenceRate: formData.incidenceRate || undefined,
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

  const handleEdit = (item: NonNullable<typeof cities>[0]) => {
    if (!item) return;
    setEditingId(item.id);
    setFormData({
      statisticsId: item.statisticsId,
      cityName: item.cityName,
      casesCount: item.casesCount,
      population: item.population ?? 0,
      incidenceRate: item.incidenceRate ?? "",
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

  // Вычисляем показатель заболеваемости автоматически
  const calculateIncidenceRate = (cases: number, population: number) => {
    if (population === 0) return "";
    return ((cases / population) * 100000).toFixed(2);
  };

  const handleCasesOrPopulationChange = (
    field: "casesCount" | "population",
    value: number,
  ) => {
    const newFormData = { ...formData, [field]: value };

    if (field === "casesCount" || field === "population") {
      const incidenceRate = calculateIncidenceRate(
        field === "casesCount" ? value : formData.casesCount,
        field === "population" ? value : formData.population,
      );
      newFormData.incidenceRate = incidenceRate;
    }

    setFormData(newFormData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Статистика по городам
          </h1>
          <p className="text-gray-600">
            Управление статистикой заболеваемости по городам
          </p>
        </div>
        <Button
          color="primary"
          onPress={handleCreate}
          isLoading={createMutation.isPending}
          isDisabled={!selectedStatisticsId}
        >
          Добавить город
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
              <Chip color="primary">
                Выбран:{" "}
                {statistics?.find((s) => s.id === selectedStatisticsId)?.year}{" "}
                год
              </Chip>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Таблица городов */}
      {selectedStatisticsId && (
        <Card>
          <CardBody>
            {isLoading ? (
              <div className="flex h-32 items-center justify-center">
                <Spinner size="lg" />
              </div>
            ) : (
              <Table aria-label="Таблица статистики по городам">
                <TableHeader>
                  <TableColumn>ГОРОД</TableColumn>
                  <TableColumn>СЛУЧАЕВ</TableColumn>
                  <TableColumn>НАСЕЛЕНИЕ</TableColumn>
                  <TableColumn>ЗАБОЛЕВАЕМОСТЬ (на 100 тыс.)</TableColumn>
                  <TableColumn>ДЕЙСТВИЯ</TableColumn>
                </TableHeader>
                <TableBody emptyContent="Нет данных для выбранного года">
                  {(cities ?? []).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-semibold">{item.cityName}</div>
                      </TableCell>
                      <TableCell>{item.casesCount.toLocaleString()}</TableCell>
                      <TableCell>
                        {item.population
                          ? item.population.toLocaleString()
                          : "—"}
                      </TableCell>
                      <TableCell>
                        {item.incidenceRate
                          ? parseFloat(item.incidenceRate).toFixed(2)
                          : "—"}
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
              Выберите год статистики для просмотра данных по городам
            </div>
          </CardBody>
        </Card>
      )}

      {/* Модальное окно для создания/редактирования */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {editingId ? "Редактировать данные города" : "Добавить город"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Название города"
                value={formData.cityName}
                onChange={(e) =>
                  setFormData({ ...formData, cityName: e.target.value })
                }
                isRequired
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Количество случаев"
                  type="number"
                  value={formData.casesCount.toString()}
                  onChange={(e) =>
                    handleCasesOrPopulationChange(
                      "casesCount",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  isRequired
                />

                <Input
                  label="Население"
                  type="number"
                  value={formData.population.toString()}
                  onChange={(e) =>
                    handleCasesOrPopulationChange(
                      "population",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
              </div>

              <Input
                label="Показатель заболеваемости (на 100 тыс. населения)"
                value={formData.incidenceRate}
                onChange={(e) =>
                  setFormData({ ...formData, incidenceRate: e.target.value })
                }
                description="Вычисляется автоматически при заполнении населения"
                isReadOnly={formData.population > 0}
              />

              <div className="text-sm text-gray-500">
                <p>
                  <strong>Год статистики:</strong>{" "}
                  {statistics?.find((s) => s.id === selectedStatisticsId)?.year}
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
