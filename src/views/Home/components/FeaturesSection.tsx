import React from "react";
import { Card } from "@/components/ui/Card";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

interface Feature {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
}) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <ConfiguredIcon name="sparkles" size={36} />
            Características Destacadas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            CVitaPilot está diseñado para ayudarte a crear CVs que realmente
            funcionen en el mercado laboral actual
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="p-6 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <ConfiguredIcon
                    name={feature.icon}
                    size={28}
                    className="text-white"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
