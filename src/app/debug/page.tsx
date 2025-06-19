// src / app / debug / page.tsx;

"use client";

import { useCV } from "@/contexts/CVContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useState } from "react";

export default function DebugPage() {
  const { state, dispatch, addSkill, addCompetence } = useCV();
  const [testName, setTestName] = useState("");

  const testAddSkill = () => {
    addSkill({
      name: `Test Skill ${Date.now()}`,
      category: "language",
      selected: true,
    });
  };

  const testAddCompetence = () => {
    addCompetence({
      name: `Test Competence ${Date.now()}`,
      selected: true,
    });
  };

  const testToggleSkill = () => {
    if (state.currentCV.skills.length > 0) {
      const firstSkill = state.currentCV.skills[0];
      dispatch({
        type: "TOGGLE_SKILL",
        payload: firstSkill.id,
      });
    }
  };

  const testUpdatePersonalInfo = () => {
    dispatch({
      type: "UPDATE_PERSONAL_INFO",
      payload: { name: testName || "Test Name Updated" },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Debug Page - Funcionalidades del CV
      </h1>

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Estado Actual</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Nombre:</strong> {state.currentCV.personalInfo.name}
          </p>
          <p>
            <strong>Skills:</strong> {state.currentCV.skills.length}
          </p>
          <p>
            <strong>Competences:</strong> {state.currentCV.competences.length}
          </p>
          <p>
            <strong>Experiences:</strong> {state.currentCV.experiences.length}
          </p>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Test Funcionalidades</h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Nuevo nombre..."
              className="px-3 py-2 border rounded mr-2"
            />
            <Button onClick={testUpdatePersonalInfo}>Actualizar Nombre</Button>
          </div>

          <Button onClick={testAddSkill}>Añadir Skill de Prueba</Button>

          <Button onClick={testAddCompetence}>
            Añadir Competencia de Prueba
          </Button>

          <Button onClick={testToggleSkill}>Toggle Primer Skill</Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Skills Actuales</h2>
        <div className="space-y-2">
          {state.currentCV.skills.map((skill) => (
            <div key={skill.id} className="flex justify-between items-center">
              <span>{skill.name}</span>
              <span
                className={skill.selected ? "text-green-600" : "text-red-600"}
              >
                {skill.selected ? "Activo" : "Inactivo"}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Competencias Actuales</h2>
        <div className="space-y-2">
          {state.currentCV.competences.map((competence) => (
            <div
              key={competence.id}
              className="flex justify-between items-center"
            >
              <span>{competence.name}</span>
              <span
                className={
                  competence.selected ? "text-green-600" : "text-red-600"
                }
              >
                {competence.selected ? "Activo" : "Inactivo"}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
