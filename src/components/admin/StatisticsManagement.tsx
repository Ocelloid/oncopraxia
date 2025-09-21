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
  useDisclosure,
  Spinner,
} from "@heroui/react";
import { api } from "~/trpc/react";

export default function StatisticsManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingId, setEditingId] = useState<number | null>(null);

  // TRPC запросы
  const {
    data: statistics,
    isLoading,
    refetch,
  } = api.info.getRegionalStatistics.useQuery();
  const createMutation = api.info.createRegionalStatistics.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setFormData(initialFormData);
    },
  });
  const updateMutation = api.info.updateRegionalStatistics.useMutation({
    onSuccess: () => {
      void refetch();
      onClose();
      setEditingId(null);
      setFormData(initialFormData);
    },
  });
  const deleteMutation = api.info.deleteRegionalStatistics.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  // Форма
  const initialFormData = {
    year: new Date().getFullYear(),
    primaryOncologyCabinets: 0,
    earlyDetectionCabinets: 0,
    ambulatoryCenters: 0,
    oncologyVisits: 0,
    examinations: 0,
    pretumorDiseases: 0,
    caopVisits: 0,
    caopGrowthPercent: "",
    chemotherapyPatients: 0,
    therapyCourses: 0,
    therapyGrowthPercent: "",
    telemedicineConsultations: 0,
    nmicConsultations: 0,
    partnerCentersCount: 0,
    earlyStageDetectionPercent: "",
    fiveYearSurvivalRate: "",
    mortalityReductionPercent: "",
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

  const handleEdit = (item: NonNullable<typeof statistics>[0]) => {
    if (!item) return;
    setEditingId(item.id);
    setFormData({
      year: item.year,
      primaryOncologyCabinets: item.primaryOncologyCabinets,
      earlyDetectionCabinets: item.earlyDetectionCabinets,
      ambulatoryCenters: item.ambulatoryCenters,
      oncologyVisits: item.oncologyVisits,
      examinations: item.examinations,
      pretumorDiseases: item.pretumorDiseases,
      caopVisits: item.caopVisits,
      caopGrowthPercent: item.caopGrowthPercent ?? "",
      chemotherapyPatients: item.chemotherapyPatients,
      therapyCourses: item.therapyCourses,
      therapyGrowthPercent: item.therapyGrowthPercent ?? "",
      telemedicineConsultations: item.telemedicineConsultations,
      nmicConsultations: item.nmicConsultations,
      partnerCentersCount: item.partnerCentersCount,
      earlyStageDetectionPercent: item.earlyStageDetectionPercent ?? "",
      fiveYearSurvivalRate: item.fiveYearSurvivalRate ?? "",
      mortalityReductionPercent: item.mortalityReductionPercent ?? "",
    });
    onOpen();
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить эту запись?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData(initialFormData);
    onOpen();
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
            Региональная статистика
          </h1>
          <p className="text-gray-600">
            Управление статистическими данными по годам
          </p>
        </div>
        <Button
          color="primary"
          onPress={handleCreate}
          isLoading={createMutation.isPending}
        >
          Добавить статистику
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table aria-label="Таблица региональной статистики">
            <TableHeader>
              <TableColumn>ГОД</TableColumn>
              <TableColumn>ОНКО КАБИНЕТЫ</TableColumn>
              <TableColumn>ПОСЕЩЕНИЯ</TableColumn>
              <TableColumn>ОСМОТРЫ</TableColumn>
              <TableColumn>ХИМИОТЕРАПИЯ</TableColumn>
              <TableColumn>ДЕЙСТВИЯ</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Нет данных">
              {(statistics ?? []).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.primaryOncologyCabinets}</TableCell>
                  <TableCell>{item.oncologyVisits.toLocaleString()}</TableCell>
                  <TableCell>{item.examinations.toLocaleString()}</TableCell>
                  <TableCell>
                    {item.chemotherapyPatients.toLocaleString()}
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>
            {editingId ? "Редактировать статистику" : "Добавить статистику"}
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                isRequired
              />
              <Input
                label="Первичные онкологические кабинеты"
                type="number"
                value={formData.primaryOncologyCabinets.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    primaryOncologyCabinets: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Кабинеты раннего выявления"
                type="number"
                value={formData.earlyDetectionCabinets.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    earlyDetectionCabinets: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Амбулаторные центры"
                type="number"
                value={formData.ambulatoryCenters.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ambulatoryCenters: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Онкологические посещения"
                type="number"
                value={formData.oncologyVisits.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oncologyVisits: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Проведено осмотров"
                type="number"
                value={formData.examinations.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    examinations: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Предопухолевые заболевания"
                type="number"
                value={formData.pretumorDiseases.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pretumorDiseases: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Посещения ЦАОП"
                type="number"
                value={formData.caopVisits.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    caopVisits: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Рост ЦАОП (%)"
                value={formData.caopGrowthPercent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    caopGrowthPercent: e.target.value,
                  })
                }
              />
              <Input
                label="Пациенты на химиотерапии"
                type="number"
                value={formData.chemotherapyPatients.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    chemotherapyPatients: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Курсы терапии"
                type="number"
                value={formData.therapyCourses.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    therapyCourses: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Рост терапии (%)"
                value={formData.therapyGrowthPercent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    therapyGrowthPercent: e.target.value,
                  })
                }
              />
              <Input
                label="Телемедицинские консультации"
                type="number"
                value={formData.telemedicineConsultations.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    telemedicineConsultations: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Консультации НМИЦ"
                type="number"
                value={formData.nmicConsultations.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nmicConsultations: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Количество партнерских центров"
                type="number"
                value={formData.partnerCentersCount.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    partnerCentersCount: parseInt(e.target.value) || 0,
                  })
                }
                isRequired
              />
              <Input
                label="Выявление ранних стадий (%)"
                value={formData.earlyStageDetectionPercent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    earlyStageDetectionPercent: e.target.value,
                  })
                }
              />
              <Input
                label="5-летняя выживаемость (%)"
                value={formData.fiveYearSurvivalRate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fiveYearSurvivalRate: e.target.value,
                  })
                }
              />
              <Input
                label="Снижение смертности (%)"
                value={formData.mortalityReductionPercent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mortalityReductionPercent: e.target.value,
                  })
                }
              />
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
