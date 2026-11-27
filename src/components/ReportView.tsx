import type { Report } from '../core/index.ts';

/** Rende un report (famiglia analyze) con evidenziazione per severità. */
export function ReportView({ report }: { report: Report }) {
  return (
    <div className="wf-report">
      <dl className="wf-report__list">
        {report.fields.map((field, index) => (
          <div
            key={index}
            className={`wf-report__row wf-report__row--${field.severity ?? 'info'}`}
          >
            <dt className="wf-report__key">{field.label}</dt>
            <dd className="wf-report__value">{field.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
