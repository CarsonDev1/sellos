import Link from "next/link";
import type { AdminSection } from "@/lib/templates";

interface Props {
  projectId: string;
  projectName: string;
  templateName: string;
  adminSections: AdminSection[];
  currentSection: string;
  children: React.ReactNode;
}

export default function SectionShell({
  projectId,
  projectName,
  templateName,
  adminSections,
  currentSection,
  children,
}: Props) {
  const currentLabel =
    adminSections.find((s) => s.key === currentSection)?.label ?? currentSection;

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href={`/dashboard/du-an/${projectId}`}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <p className="text-xs text-slate-400">
            <Link href="/dashboard/du-an" className="hover:text-slate-600">Dự án</Link>
            {" / "}
            <Link href={`/dashboard/du-an/${projectId}`} className="hover:text-slate-600">{projectName}</Link>
            {" / "}
            <span className="text-slate-700">{currentLabel}</span>
          </p>
          <h1 className="text-xl font-heading font-bold text-slate-900 mt-0.5">
            {currentLabel}
          </h1>
          <p className="text-xs text-slate-400">{templateName}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {adminSections
          .filter((s) => s.key !== "overview")
          .map((s) => {
            const active = s.key === currentSection;
            return (
              <Link
                key={s.key}
                href={`/dashboard/du-an/${projectId}/quan-ly/${s.key}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
      </div>

      {/* Body */}
      <div>{children}</div>
    </div>
  );
}
