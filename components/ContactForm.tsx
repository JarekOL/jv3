"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MainBtn } from "@/components/Buttons/MainBtn";

const FormField = ({
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    label,
}: {
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    required?: boolean;
    label?: string;
}) => {
    const isDate = type === "date";

    return (
        <div className="w-full relative">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium mb-1"
                >
                    {label}
                </label>
            )}
            <div className={isDate ? "relative" : ""}>
               
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={isDate ? "Wybierz datę" : placeholder}
                    required={required}
                    className={`w-full p-2 border rounded text-black`}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

const MessageStatus = ({
    status,
    loading,
    statusType,
}: {
    status: string | null;
    loading: boolean;
    statusType: "success" | "error" | null;
}) => (
    <div className="text-sm flex items-center space-x-2">
        {loading && (
            <div className="w-4 h-4 border-2 border-t-transparent border-brand-nav border-solid rounded-full animate-spin"></div>
        )}
        <p
            className={`ml-2 ${
                statusType === "success"
                    ? "text-green-400"
                    : statusType === "error"
                    ? "text-red-400"
                    : "text-white"
            }`}
        >
            {status}
        </p>
    </div>
);

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        message: "",
    });
    const [status, setStatus] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);
    const [statusType, setStatusType] = useState<"success" | "error" | null>(
        null
    );
    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Wysyłanie...");
        setLoading(true);
        setStatusType(null);

        try {
            const response = await fetch("/api/kontakt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("Wiadomość wysłana!");
                setStatusType("success");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    date: "",
                    message: "",
                });

                setTimeout(() => {
                    router.push("/dziekuje");
                }, 500);
            } else {
                setStatus("Błąd podczas wysyłania.");
                setStatusType("error");
            }
        } catch (error) {
            console.error("Błąd podczas wysyłania formularza:", error);
            setStatus("Błąd podczas wysyłania.");
            setStatusType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg text-black text-start">
            <p className=" text-2xl text-center">Formularz kontaktowy</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <FormField
                    name="name"
                    placeholder="Imię i nazwisko"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <FormField
                    name="email"
                    type="email"
                    placeholder="Adres e-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <FormField
                    name="phone"
                    placeholder="Nr telefonu"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <FormField
                    name="date"
                    type="date"
                    label="Data (opcjonalnie)"
                    value={formData.date}
                    onChange={handleChange}
                />
                <textarea
                    name="message"
                    placeholder="Kilka słów o tym jakie zdjęcia Cię interesują."
                    required
                    className="w-full p-2 border rounded"
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
                <div className="ml-auto w-full text-end">
                    <MainBtn type="submit">
                        {status ? (
                            <MessageStatus
                                status={status}
                                loading={loading}
                                statusType={statusType}
                            />
                        ) : (
                            <span>Wyślij wiadomość</span>
                        )}
                    </MainBtn>
                </div>
            </form>
        </div>
    );
}
