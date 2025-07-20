"use client";

import React, { useState } from "react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const faqData: FAQItem[] = [
    // Cuenta y registro
    {
      question: "¿Cómo me registro en CVitaPilot?",
      answer:
        "Puedes registrarte usando tu email y contraseña, o directamente con tu cuenta de Google o LinkedIn. El proceso es rápido y seguro.",
      category: "account",
    },
    {
      question: "¿Puedo cambiar mi contraseña?",
      answer:
        "Sí, puedes cambiar tu contraseña desde la sección de Configuración > Seguridad. También puedes configurar autenticación de dos factores para mayor seguridad.",
      category: "account",
    },
    {
      question: "¿Cómo elimino mi cuenta?",
      answer:
        "Puedes eliminar tu cuenta desde Configuración > Privacidad y Datos > Zona de peligro. Ten en cuenta que esta acción es irreversible y eliminará todos tus datos.",
      category: "account",
    },

    // CVs y contenido
    {
      question: "¿Cuántos CVs puedo crear?",
      answer:
        "Puedes crear tantos CVs como necesites. Cada CV puede tener diferentes formatos y contenido adaptado a diferentes ofertas de trabajo.",
      category: "cvs",
    },
    {
      question: "¿Qué formatos de CV están disponibles?",
      answer:
        "Actualmente soportamos formato ATS (optimizado para sistemas de reclutamiento) y formato Europass. Estamos trabajando en más formatos.",
      category: "cvs",
    },
    {
      question: "¿Puedo exportar mi CV en PDF?",
      answer:
        "Sí, puedes exportar tus CVs en formato PDF desde la vista previa. El PDF mantendrá el formato y diseño exacto que ves en pantalla.",
      category: "cvs",
    },
    {
      question: "¿Cómo optimizo mi CV para sistemas ATS?",
      answer:
        "Usa palabras clave relevantes, mantén un formato simple y claro, incluye información de contacto completa, y asegúrate de que el contenido sea fácil de leer para los sistemas automatizados.",
      category: "cvs",
    },

    // Funcionalidades
    {
      question: "¿Cómo funciona el guardado automático?",
      answer:
        "CVitaPilot guarda automáticamente tus cambios cada 30 segundos. Puedes activar o desactivar esta función en Configuración > Preferencias.",
      category: "features",
    },
    {
      question: "¿Puedo cambiar el tema de la aplicación?",
      answer:
        "Sí, puedes cambiar entre tema claro, oscuro o seguir la preferencia de tu sistema desde Configuración > Preferencias > Tema de la aplicación.",
      category: "features",
    },
    {
      question: "¿Cómo exporto todos mis datos?",
      answer:
        "Puedes exportar todos tus datos desde Configuración > Privacidad y Datos > Exportación de datos. Se descargará un archivo JSON con toda tu información.",
      category: "features",
    },

    // Privacidad y seguridad
    {
      question: "¿Son seguros mis datos?",
      answer:
        "Sí, utilizamos encriptación de extremo a extremo y cumplimos con las regulaciones de protección de datos. Tus datos están seguros y solo tú tienes acceso a ellos.",
      category: "privacy",
    },
    {
      question: "¿Compartís mis datos con terceros?",
      answer:
        "No, no compartimos tus datos personales con terceros. Solo utilizamos datos agregados y anónimos para mejorar nuestros servicios.",
      category: "privacy",
    },

    // Problemas técnicos
    {
      question: "¿Qué hago si no puedo acceder a mi cuenta?",
      answer:
        "Puedes usar la función 'Olvidé mi contraseña' en la página de login, o contactar con nuestro soporte técnico si el problema persiste.",
      category: "technical",
    },
    {
      question: "¿La aplicación funciona en móviles?",
      answer:
        "Sí, CVitaPilot es completamente responsive y funciona perfectamente en dispositivos móviles, tablets y ordenadores.",
      category: "technical",
    },
    {
      question: "¿Qué navegadores son compatibles?",
      answer:
        "CVitaPilot funciona en todos los navegadores modernos: Chrome, Firefox, Safari, Edge y otros basados en Chromium.",
      category: "technical",
    },
  ];

  const categories = [
    { id: "all", label: "Todas", icon: "list" },
    { id: "account", label: "Cuenta", icon: "user" },
    { id: "cvs", label: "CVs", icon: "file-text" },
    { id: "features", label: "Funcionalidades", icon: "settings" },
    { id: "privacy", label: "Privacidad", icon: "shield" },
    { id: "technical", label: "Técnico", icon: "tool" },
  ];

  const filteredFAQs =
    selectedCategory === "all"
      ? faqData
      : faqData.filter((faq) => faq.category === selectedCategory);

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <ConfiguredIcon
            name="help-circle"
            size={48}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Preguntas Frecuentes
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Encuentra respuestas a las preguntas más comunes sobre CVitaPilot
        </p>
      </div>

      {/* Category Filter */}
      <Card className="p-4 sm:p-6 mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={
                selectedCategory === category.id ? "primary" : "secondary"
              }
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <ConfiguredIcon name={category.icon} size={16} />
              {category.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <Card key={index} className="p-4 sm:p-6">
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                {expandedItems.has(index) && (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
              <ConfiguredIcon
                name={expandedItems.has(index) ? "chevron-up" : "chevron-down"}
                size={20}
                className="text-gray-500 flex-shrink-0 mt-1"
              />
            </button>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card className="p-6 mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          ¿No encontraste lo que buscabas?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Nuestro equipo de soporte está aquí para ayudarte
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => (window.location.href = "/settings#support")}
            className="flex items-center gap-2"
          >
            <ConfiguredIcon name="mail" size={16} />
            Contactar soporte
          </Button>
          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/guia-cv")}
            className="flex items-center gap-2"
          >
            <ConfiguredIcon name="book" size={16} />
            Ver guías completas
          </Button>
        </div>
      </Card>
    </div>
  );
};
