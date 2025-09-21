import Link from "next/link";
import { Card, CardBody, Button } from "@heroui/react";

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardBody className="p-8 text-center">
          <div className="mb-6">
            <div className="mb-4 text-6xl">🚫</div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Доступ запрещен
            </h1>
            <p className="text-gray-600">
              У вас нет прав для доступа к административной панели.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              Если вы считаете, что это ошибка, обратитесь к администратору
              системы.
            </p>

            <div className="pt-4">
              <Button as={Link} href="/" color="primary" className="w-full">
                Вернуться на главную
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
