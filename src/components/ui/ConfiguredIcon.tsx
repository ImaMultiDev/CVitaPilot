import { Icon } from "svgstorm-client";
import { SVGSTORM_CONFIG } from "@/config/svgstorm.config";
import React from "react";

export function ConfiguredIcon({
  name,
  ...props
}: React.ComponentProps<typeof Icon>) {
  return (
    <Icon name={name} apiBaseUrl={SVGSTORM_CONFIG.apiBaseUrl} {...props} />
  );
}
