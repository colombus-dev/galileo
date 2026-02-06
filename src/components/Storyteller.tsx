import React from "react";

export type StorytellerAlign = "left" | "center";
export type StorytellerTone = "default" | "subtle" | "muted" | "brand";
export type StorytellerSize = "sm" | "md" | "lg";
export type StorytellerVariant = "plain" | "panel" | "card";

export type StorytellerProps = {
  /** Obligatoire */
  title: string;
  /** Obligatoire — un seul paragraphe, 2–3 phrases max */
  paragraph: string;

  /** Hiérarchie de titre */
  as?: "h1" | "h2" | "h3" | "h4";

  /** Variantes de style du bloc */
  variant?: StorytellerVariant;

  /** Ton (couleurs/contraste) */
  tone?: StorytellerTone;

  /** Taille globale (spacing + tailles typo) */
  size?: StorytellerSize;

  /** Alignement */
  align?: StorytellerAlign;

  /** Largeur max du bloc */
  maxWidth?: number | string;

  /** Optionnel: badge/label au-dessus du titre (texte simple) */
  eyebrow?: string;

  /** Optionnel: helper texte sous le paragraphe (texte simple, court) */
  helper?: string;

  /** Optionnel: texte à droite (ex: “Mis à jour il y a 2 jours”) */
  meta?: string;

  /** Optionnel: actions à droite (boutons/liens) */
  actions?: React.ReactNode;

  /** Affiche une séparation (utile en header de section) */
  showDivider?: boolean;

  /** Affiche une icône simple (node) avant le titre */
  icon?: React.ReactNode;

  className?: string;

  /** Permet de passer un style inline sans casser l’API */
  style?: React.CSSProperties;

  /** Id accessible pour lier une section */
  id?: string;
};

const clamp1Line: React.CSSProperties = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

function getTokens(opts: {
  tone: StorytellerTone;
  variant: StorytellerVariant;
}) {
  const { tone, variant } = opts;

  const toneMap: Record<
    StorytellerTone,
    { title: string; paragraph: string; border: string; bg: string }
  > = {
    default: { title: "#0f172a", paragraph: "#334155", border: "#e2e8f0", bg: "#ffffff" },
    subtle: { title: "#334155", paragraph: "#475569", border: "#e2e8f0", bg: "#ffffff" },
    muted: { title: "#0f172a", paragraph: "#475569", border: "#e2e8f0", bg: "#f8fafc" },
    brand: { title: "#0f172a", paragraph: "#334155", border: "#cbd5e1", bg: "#f1f5f9" },
  };

  const base = toneMap[tone];

  const variantMap: Record<
    StorytellerVariant,
    { padding: number; radius: number; shadow?: string }
  > = {
    plain: { padding: 0, radius: 0 },
    panel: { padding: 12, radius: 12 },
    card: { padding: 16, radius: 16, shadow: "0 1px 10px rgba(15, 23, 42, 0.06)" },
  };

  return { ...base, ...variantMap[variant] };
}

function getSize(opts: { size: StorytellerSize; as: "h1" | "h2" | "h3" | "h4" }) {
  const { size, as } = opts;

  const titleBase = { h1: 34, h2: 26, h3: 18, h4: 16 }[as];
  const mul = size === "lg" ? 1.08 : size === "sm" ? 0.95 : 1;

  const gap = size === "lg" ? 10 : size === "sm" ? 6 : 8;
  const para = size === "lg" ? 15 : size === "sm" ? 13 : 14;

  return {
    gap,
    titleSize: Math.round(titleBase * mul),
    paragraphSize: para,
    eyebrowSize: size === "lg" ? 12 : 11,
    helperSize: size === "lg" ? 13 : 12,
  };
}

export const Storyteller = ({
  title,
  paragraph,
  as: As = "h2",
  variant = "plain",
  tone = "default",
  size = "md",
  align = "left",
  maxWidth = 720,
  eyebrow,
  helper,
  meta,
  actions,
  showDivider = false,
  icon,
  className,
  style,
  id,
}: StorytellerProps) => {
  const tokens = getTokens({ tone, variant });
  const sizing = getSize({ size, as: As });

  const isCentered = align === "center";

  return (
    <section
      id={id}
      className={className}
      style={{
        maxWidth,
        ...(variant !== "plain"
          ? {
              padding: tokens.padding,
              borderRadius: tokens.radius,
              border: `1px solid ${tokens.border}`,
              background: tokens.bg,
              boxShadow: tokens.shadow,
            }
          : {}),
        display: "grid",
        gap: sizing.gap,
        ...style,
      }}
      aria-label="Storyteller"
    >
      {(eyebrow || meta || actions) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: sizing.eyebrowSize,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: tokens.paragraph,
              opacity: 0.9,
              ...(isCentered ? { margin: "0 auto" } : {}),
              ...(eyebrow ? {} : { visibility: "hidden" }),
              ...(variant === "plain" ? {} : clamp1Line),
            }}
            aria-label="Eyebrow"
            title={eyebrow}
          >
            {eyebrow ?? "—"}
          </div>

          {(meta || actions) && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {meta && (
                <div
                  style={{
                    fontSize: 12,
                    color: tokens.paragraph,
                    opacity: 0.85,
                    ...clamp1Line,
                    maxWidth: 240,
                  }}
                  aria-label="Meta"
                  title={meta}
                >
                  {meta}
                </div>
              )}
              {actions && <div aria-label="Actions">{actions}</div>}
            </div>
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          justifyContent: isCentered ? "center" : "flex-start",
          textAlign: isCentered ? "center" : "left",
        }}
      >
        {icon && <div style={{ marginTop: 2 }} aria-hidden="true">{icon}</div>}

        <div style={{ display: "grid", gap: sizing.gap }}>
          <As
            style={{
              margin: 0,
              color: tokens.title,
              fontWeight: 650,
              fontSize: sizing.titleSize,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </As>

          <p
            style={{
              margin: 0,
              color: tokens.paragraph,
              fontSize: sizing.paragraphSize,
              lineHeight: 1.55,
              maxWidth: isCentered ? 720 : undefined,
            }}
          >
            {paragraph}
          </p>

          {helper && (
            <p
              style={{
                margin: 0,
                color: tokens.paragraph,
                opacity: 0.85,
                fontSize: sizing.helperSize,
                lineHeight: 1.45,
              }}
            >
              {helper}
            </p>
          )}
        </div>
      </div>

      {showDivider && (
        <div
          role="separator"
          aria-hidden="true"
          style={{
            height: 1,
            background: tokens.border,
            marginTop: 4,
          }}
        />
      )}
    </section>
  );
};