import { Trans } from "@lingui/react/macro";
import { Field, FieldLabel, Input, Toggle } from "@rakazo/ui-web";
import { useId } from "react";

export type ConnectionMode = "cloud" | "local";

/** Hosted service or a self-hosted instance at a base URL. */
export function ConnectionModeFields({
  busy,
  mode,
  onModeChange,
  baseUrl,
  onBaseUrlChange,
  baseUrlPlaceholder,
}: {
  busy: boolean;
  mode: ConnectionMode;
  onModeChange: (mode: ConnectionMode) => void;
  baseUrl: string;
  onBaseUrlChange: (baseUrl: string) => void;
  baseUrlPlaceholder: string;
}) {
  const baseUrlId = useId();
  return (
    <>
      <div className="flex gap-2">
        {(["cloud", "local"] as const).map((option) => (
          <Toggle
            key={option}
            variant="outline"
            pressed={mode === option}
            disabled={busy}
            onPressedChange={() => onModeChange(option)}
            className="flex-1 font-normal text-muted-foreground aria-pressed:text-foreground"
          >
            {option === "cloud" ? <Trans>Cloud</Trans> : <Trans>Local</Trans>}
          </Toggle>
        ))}
      </div>

      {mode === "local" ? (
        <Field className="mt-4">
          <FieldLabel htmlFor={baseUrlId}>
            <Trans>Base URL</Trans>
          </FieldLabel>
          <Input
            id={baseUrlId}
            value={baseUrl}
            disabled={busy}
            onChange={(event) => onBaseUrlChange(event.target.value)}
            placeholder={baseUrlPlaceholder}
          />
        </Field>
      ) : null}
    </>
  );
}
