// @ts-nocheck
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

/* ─── helpers ────────────────────────────────────────── */
function extractChecks(data) {
  const out = [];
  for (const [name, metric] of Object.entries(data.metrics)) {
    if (metric.type === 'rate' && name !== 'checks') {
      out.push({
        name,
        passes: metric.values.passes,
        fails: metric.values.fails,
        passRate: (metric.values.rate * 100).toFixed(2) + '%',
      });
    }
  }
  return out;
}

function extractGraphQLErrors(data) {
  const samples = data.gql_errors ? data.gql_errors.values : [];
  return Array.from(new Set(samples)).slice(0, 10);
}

/* ─── HTML report generator ─────────────────────────── */
function htmlReport(data) {
  const summary   = textSummary(data, { indent: ' ', enableColors: false });
  const checks    = extractChecks(data);
  const gqlErrors = extractGraphQLErrors(data);

  const passTotal = checks.reduce((a, r) => a + r.passes, 0);
  const failTotal = checks.reduce((a, r) => a + r.fails, 0);

  return `
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<title>k6 Load Test Summary</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
 body{font-family:Arial,serif;margin:2rem;color:#222}
 h1{color:#0076d7}
 .chart{width:300px;margin:auto}
 .scroll{max-height:300px;overflow-y:auto;border:1px solid #ddd;border-radius:6px}
 table{width:100%;border-collapse:collapse}
 th,td{padding:8px 12px;border-bottom:1px solid #eee;text-align:left}
 th{background:#f5f5f5;position:sticky;top:0}
 .pass{color:#090;font-weight:bold}.fail{color:#c00;font-weight:bold}
 .errors{background:#fff7f7;padding:1rem;border:1px solid #f3c2c2;border-radius:6px}
</style></head><body>
<h1>k6 Load Test Summary</h1>

<h2>High‑level Metrics</h2>
<pre>${summary}</pre>

<h2>Checks – Pass vs Fail</h2>
<div class="chart"><canvas id="pie"></canvas></div>

<h2>Detailed Checks</h2>
<div class="scroll">
<table>
<thead><tr><th>Check</th><th>Passes</th><th>Fails</th><th>Pass Rate</th></tr></thead>
<tbody>
${checks.map(c=>`<tr><td>${c.name}</td><td class="pass">${c.passes}</td><td class="fail">${c.fails}</td><td>${c.passRate}</td></tr>`).join('')}
</tbody>
</table>
</div>

${gqlErrors.length ? `<h2>GraphQL Error Samples</h2><div class="errors"><ul>${gqlErrors.map(e=>`<li>${e}</li>`).join('')}</ul></div>` : ''}

<script>
new Chart(document.getElementById('pie'),{
  type:'pie',
  data:{labels:['Pass','Fail'],datasets:[{data:[${passTotal},${failTotal}]}]},
  options:{plugins:{legend:{position:'bottom'}}}
});
</script>
</body></html>`;
}

/* ─── k6 summary hook ───────────────────────────────── */
export function handleSummary(data) {
  const stamp    = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `summary-${stamp}.html`;
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: false }),
    [filename]: htmlReport(data),
  };
}
