import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar 50 caracteres"),

  correo: z.string()
    .email("Correo electrónico inválido"),

  contraseña: z.string()
    .min(8, "La contraseña debe tener mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe incluir al menos una letra mayúscula")
    .regex(/[0-9]/, "Debe incluir al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe incluir al menos un carácter especial"),

  confirmPassword: z.string(),

  rol_id: z.string()
    .nonempty("El rol es obligatorio"), // validación de rol
}).refine((data) => data.contraseña === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});