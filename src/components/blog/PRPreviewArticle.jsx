import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./article.css";

export const PRPreviewArticle = () => {
  const navigate = useNavigate();
  const prevTheme = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    prevTheme.current = document.documentElement.getAttribute("data-theme") || "dark";
    document.documentElement.setAttribute("data-theme", "dark");
    return () => {
      if (prevTheme.current) {
        document.documentElement.setAttribute("data-theme", prevTheme.current);
      }
    };
  }, []);

  const handleBack = () => {
    if (prevTheme.current) {
      document.documentElement.setAttribute("data-theme", prevTheme.current);
    }
    navigate("/");
  };

  return (
    <div className="article-page theme-teal">
      <button onClick={handleBack} className="article-back-btn">
        ← Back
      </button>

      {/* HERO */}
      <header className="hero">
        <div className="hero-eyebrow">DevOps & Infrastructure</div>
        <h1>
          From 10-Minute QA Setup to 30 Seconds:{" "}
          <em>One-Click PR Previews</em>
        </h1>
        <p className="hero-subtitle">
          How we turned every pull request into a fully wired full-stack
          environment — backend on Railway, two frontends on Vercel, a mobile
          build over-the-air via EAS, and a Postman collection that
          auto-authenticates itself.
        </p>
        <div className="hero-meta">
          <span>📖 35 min read</span>
          <span>·</span>
          <span>DevOps Engineering</span>
          <span>·</span>
          <span>2026</span>
        </div>
        <div className="hero-divider"></div>
      </header>

      <div className="tags">
        {["GitHub Actions", "Railway", "Vercel", "EAS", "Postman", "CI/CD", "DevOps"].map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* ARTICLE */}
      <article className="article">
        <p className="lead">
          We're a small startup team. There is no separate QA team — testing and
          reviewing PRs is every developer's responsibility, on top of writing
          the next feature. And here's something we've come to believe pretty
          strongly: <strong>the best testing doesn't happen on localhost. It
          happens in an environment that looks like production.</strong>
        </p>

        <p>
          Cruit is a referral platform with three frontends — a web dashboard, a
          backoffice admin tool, and a React Native mobile app — all talking to
          one Express/Node backend with WorkOS authentication. So "test it in
          something that looks like production" is harder than it sounds: you
          need a real backend, a real frontend deploy, real auth, real ATS
          integrations, and ideally a way to test on a real phone for the mobile
          changes.
        </p>

        <p>
          Where we started wasn't terrible, but it had cracks. Vercel was
          already auto-deploying a preview frontend on every PR push, which is
          great for pure UI work. But the moment a PR touched the backend, the
          experience fell apart:
        </p>

        <p>
          The Vercel preview was still pointed at the production backend, so the
          new endpoint or the new field your PR added simply didn't exist from
          the frontend's perspective. To test against an actual backend with the
          PR's changes, you had to manually go into Vercel's project settings,
          find the branch-based env var configuration, and override{" "}
          <code>NEXT_PUBLIC_API_BACKEND</code> to point at our staging backend
          — which itself was just one shared environment that everyone was
          stepping on. There was no per-PR backend URL. If two backend PRs were
          open at the same time, whoever deployed last to staging won.
        </p>

        <p>
          When we sat down as a team to figure out where our biggest source of
          PR-review latency was coming from, the answer was unanimous:{" "}
          <strong>testing.</strong> Not the writing of tests, but the act of
          actually running the PR's behavior against something real. The goal we
          set: any PR should be testable in a production-like environment in{" "}
          <strong>under 30 seconds, with zero manual setup</strong>. Click a
          link in the PR comment, you're testing.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 1 */}
        <h2>What "Preview Environment" Usually Means (and Why That's Not Enough)</h2>

        <p>
          When most teams say "preview environment," they mean: Vercel or
          Netlify automatically deploys the frontend on every PR push. That's
          great as far as it goes — your design reviewer can see the new button.
          But it falls apart the moment your PR includes a backend change,
          because that beautifully-deployed preview frontend is still pointed at
          production.
        </p>

        <p>
          The fix is "ephemeral environments" — for every PR, you spin up a
          fresh backend, point the frontend at it, and tear it down when the PR
          closes. Conceptually simple. In practice, six interlocking pieces have
          to work:
        </p>

        <p>
          <strong>1.</strong> Detect what changed — only spin up an ephemeral
          backend if backend code actually changed.{" "}
          <strong>2.</strong> Provision the backend — clone production's config,
          deploy the PR branch, wait for healthcheck.{" "}
          <strong>3.</strong> Wire the frontends — update per-branch env vars on
          Vercel and trigger redeploys.{" "}
          <strong>4.</strong> Make the API testable — generate a Postman
          collection that authenticates automatically.{" "}
          <strong>5.</strong> Bundle the mobile app OTA — let testers scan a QR
          code and get the PR's JS bundle in seconds.{" "}
          <strong>6.</strong> Clean it all up on PR close — environments, env
          vars, collections, branches, all of it.
        </p>

        <div className="callout">
          <p>
            <strong>Hard rule from the start:</strong> the system has to feel
            boring. Click the link in the PR comment. Get what you expect. Done.
            If any one piece breaks down, the whole thing becomes a thing
            engineers tolerate rather than rely on.
          </p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 2 */}
        <h2>The Architecture, at a Glance</h2>

        <p>
          Everything runs from a single GitHub Actions workflow with five jobs:
        </p>

        <div className="arch-diagram">
          <pre>
{`       ┌─────────┐
       │ triage  │  ← always runs, ~10 sec, no checkout
       └────┬────┘
            │ outputs: backend_changed?, backoffice_changed?, mobile_changed?
            ▼
       ┌─────────────┐
       │ web-preview │  ← always runs, two paths (heavy/light)
       └─┬─────┬─────┘
         │     │
         │     ├──────────────┬──────────────┐
         ▼     ▼              ▼              ▼
   ┌────────┐ ┌────────────┐ ┌─────────────┐
   │  bo-   │ │  mobile-   │ │  cleanup    │
   │preview │ │  preview   │ │ (PR close)  │
   └────────┘ └────────────┘ └─────────────┘`}
          </pre>
        </div>

        <p>
          The triage job is the cost-control center. The whole rest of the
          system is built around the principle that{" "}
          <strong>most PRs don't change everything, and we shouldn't pay
          for what we don't change.</strong>
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 3 */}
        <h2>Layer 1: Triage — The Cheapest Job That Makes Everything Else Cheap</h2>

        <div className="code-block" data-lang="yaml">
          <code>
{`triage:
  runs-on: ubuntu-latest
  outputs:
    backend_changed: \${{ steps.filter.outputs.backend }}
    backoffice_changed: \${{ steps.filter.outputs.backoffice }}
    mobile_changed: \${{ steps.filter.outputs.mobile }}
  steps:
    - uses: dorny/paths-filter@v3
      with:
        filters: |
          backend:    'apps/cruit-backend/**'
          backoffice: 'apps/cruit-backoffice/**'
          mobile:     'apps/cruit-app/**'`}
          </code>
        </div>

        <p>
          Two things to notice. <strong>No <code>actions/checkout</code>.</strong>{" "}
          <code>dorny/paths-filter</code> uses the GitHub API to read the
          changed file list directly. Skipping the checkout saves ~15 seconds
          and a few hundred MB of network. On a job that runs on every push,
          that adds up.
        </p>

        <p>
          <strong>Outputs become inputs to every other job.</strong> The
          downstream jobs gate themselves on these outputs. The mobile job won't
          run if mobile didn't change. The web-preview job runs in "heavy" mode
          only if backend changed; otherwise it falls back to the production
          backend domain, which costs nothing. For a typical month at our team's
          PR volume, this saves ~80% of what a naive implementation would cost.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 4 */}
        <h2>Layer 2: Web Preview — The Heavy/Light Split</h2>

        <h3>Light Path (No Backend Change): ~30 Seconds</h3>

        <p>
          If you're reviewing a frontend-only PR, you don't need a separate
          backend. The Vercel preview just needs to be told to point at our
          always-on production backend domain:
        </p>

        <div className="code-block" data-lang="yaml">
          <code>
{`- name: Resolve backend URL for Vercel
  run: |
    if [ "\${BACKEND_CHANGED}" = "true" ]; then
      echo "backend_url=https://\${PR_DOMAIN}" >> "$GITHUB_OUTPUT"
    else
      echo "backend_url=https://\${PROD_DOMAIN}" >> "$GITHUB_OUTPUT"
    fi`}
          </code>
        </div>

        <h3>Heavy Path (Backend Changed): The Interesting One</h3>

        <p>
          When a backend change is detected, we go through five sub-steps in
          sequence.
        </p>

        <h3>1. Clone or Reuse the Railway Environment</h3>

        <p>
          Railway has a concept of "environments" within a project — like git
          branches but for runtime environments. We use one environment per PR,
          named <code>pr-$&#123;PR_NUMBER&#125;</code>:
        </p>

        <div className="code-block" data-lang="bash">
          <code>
{`ENVS=$(curl -sS -X POST "$RAILWAY_API" \\
  -H "Authorization: Bearer \${RAILWAY_TOKEN}" \\
  -d "{\\"query\\": \\"{ project(id: ...) { environments { edges { node { id name } } } } }\\"}")

ENV_ID=$(echo "$ENVS" | jq -r \\
  ".data.project.environments.edges[]? \\
  | select(.node.name == \\"pr-\${PR_NUMBER}\\") \\
  | .node.id")

if [ -z "$ENV_ID" ]; then
  # Clone from production
  curl -sS -X POST "$RAILWAY_API" \\
    -d "{\\"query\\": \\"mutation { environmentCreate(input: { \\
      name: \\\\\\"pr-\${PR_NUMBER}\\\\\\", \\
      projectId: \\\\\\"...\\\\\\" }) { id } }\\"}"
fi`}
          </code>
        </div>

        <p>
          This is idempotent. If the PR was opened before and got a fresh push,
          we reuse the existing env. The trick: using Railway's GraphQL API
          directly via <code>curl</code>, rather than the official CLI. The CLI
          is great for interactive use but not ideal in CI — it can be slow to
          install, requires interactive prompts, and doesn't expose every
          operation we need.
        </p>

        <h3>2. Wait for Deploy (and Auto-Approve if Railway Demands It)</h3>

        <p>
          Railway has an undocumented <code>NEEDS_APPROVAL</code> gate that can
          hold deployments hostage. There's no toggle to turn it off. So we
          built around it:
        </p>

        <div className="code-block" data-lang="bash">
          <code>
{`for i in $(seq 1 60); do
  sleep 10
  STATUS=$(curl ... | jq -r '.data.deployments.edges[0].node.status')

  if [ "$STATUS" = "NEEDS_APPROVAL" ] && [ "$APPROVED" = "false" ]; then
    curl ... "mutation { deploymentApprove(id: \\"\${DEPLOY_ID}\\") }"
    APPROVED=true
    continue
  fi

  if [ "$STATUS" = "SUCCESS" ]; then break; fi
  if [ "$STATUS" = "FAILED" ]; then exit 1; fi
done`}
          </code>
        </div>

        <h3>3. Override Dynamic Env Vars</h3>

        <p>
          Now we know the PR backend's URL. We push it back into Railway as an
          env var so the backend itself knows its public URL, and enable
          preview-only features:
        </p>

        <div className="code-block" data-lang="json">
          <code>
{`{
  "variables": {
    "CRUIT_BACKEND_DOMAIN": "\${DOMAIN}",
    "ENABLE_SWAGGER": "true",
    "ENABLE_DEV_TOKEN": "true"
  }
}`}
          </code>
        </div>

        <p>
          <code>ENABLE_SWAGGER=true</code> makes the OpenAPI UI accessible on
          the preview backend (it's off in production).{" "}
          <code>ENABLE_DEV_TOKEN=true</code> enables an auth bypass endpoint
          we'll get to in a minute.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 5 — Screenshots */}
        <div className="article-media">
          <img
            src="/blog/pr-preview-frontend.png"
            alt="PR Preview Environment comment — frontend and mobile preview with QR code"
            className="article-img"
          />
          <p className="media-caption">
            PR comment for a frontend/mobile change — Vercel preview URL,
            mobile QR code, and EAS branch info
          </p>
        </div>

        <div className="article-media">
          <img
            src="/blog/pr-preview-backend.png"
            alt="Backend Preview Environment comment — Railway ephemeral backend with Postman collection"
            className="article-img"
          />
          <p className="media-caption">
            PR comment for a backend change — ephemeral Railway backend,
            Postman "Run in Postman" button, and changed API routes
          </p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 6 */}
        <h2>Layer 3: Mobile Preview — QR Code Over-the-Air</h2>

        <p>
          The mobile preview was the layer I was most skeptical about. React
          Native preview environments have historically been a nightmare —
          anything that requires a native rebuild means EAS Build (5-15 minutes
          per platform), a TestFlight roundtrip, or Google Play Internal
          Testing.
        </p>

        <p>
          Then I learned about Expo's "EAS Update" flow, which lets you publish
          a JavaScript bundle that an existing dev client can load
          over-the-air. No rebuild. No reinstall. Scan a QR code, the app
          reloads in seconds with the PR's code.
        </p>

        <div className="code-block" data-lang="yaml">
          <code>
{`- name: Publish EAS Update
  working-directory: apps/cruit-app
  run: |
    eas update \\
      --branch "pr-\${PR_NUMBER}" \\
      --message "PR #\${PR_NUMBER}: \${PR_TITLE}" \\
      --environment development \\
      --non-interactive --json > /tmp/eas-update.json

    PERMALINK=$(jq -r \\
      '[.[].manifestPermalink] | .[0] // empty' \\
      /tmp/eas-update.json)

    QR_DATA=$(printf '%s' "\${PERMALINK}" | jq -sRr @uri)
    QR_URL="https://api.qrserver.com/v1/create-qr-code/\\
?size=240x240&data=\${QR_DATA}"`}
          </code>
        </div>

        <p>
          Then we drop the QR image directly into the PR comment. Reviewer
          scans with their phone camera. Boom — they're testing the PR's UI on
          a real device. Setup time: zero.
        </p>

        <div className="callout">
          <p>
            <strong>Phase 1 limitation:</strong> This only works for JS-only
            changes. If the PR touches <code>ios/</code>,{" "}
            <code>android/</code>, <code>app.json</code>, or native
            dependencies, the dev client will see a fingerprint mismatch and
            refuse to load. Phase 2 will add an opt-in{" "}
            <code>eas build</code> path triggered by a label.
          </p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 7 */}
        <h2>Layer 4: Postman with Auto-Authentication — The Killer Feature</h2>

        <p>
          This is the part I'm most proud of, because it solves the friction
          that started this whole project. Even with a beautiful preview backend
          deployed, reviewers were still skipping API testing because the auth
          dance took 5-10 minutes:
        </p>

        <p>
          Open the web app → Click "Log in" → WorkOS redirect → Log in with dev
          account → Redirect back → DevTools → Network tab → Find the JWT →
          Copy it → Open Postman → Paste into <code>authToken</code> variable →{" "}
          <em>Now</em> you can test.
        </p>

        <p>
          So we built two pieces.
        </p>

        <h3>Piece 1: A Dev-Token Endpoint</h3>

        <p>
          A new backend endpoint, <code>POST /auth/v2/dev-token</code>, that
          bypasses WorkOS entirely. Give it an email, it returns a real JWT —
          same shape and signing as a real login:
        </p>

        <div className="code-block" data-lang="javascript">
          <code>
{`const devToken = async (req, res, next) => {
  try {
    if (isProd()) {
      throw new APIError(403, 'Not available in production');
    }
    if (process.env.ENABLE_DEV_TOKEN !== 'true') {
      throw new APIError(403, 'Dev token endpoint is disabled');
    }

    const { email, companyId } = req.body;
    const { accessToken, refreshToken, roles } =
      await WorkosAuthService.mockAuthCallback(
        email, companyId || null
      );

    return new APIResponse(res, {
      access_token: accessToken, ...
    });
  } catch (error) {
    return next(error);
  }
};`}
          </code>
        </div>

        <p>
          The security model is defense-in-depth:{" "}
          <code>isProd()</code> returns <code>false</code> in production,
          hard-coded and can't be bypassed by env vars.{" "}
          <code>ENABLE_DEV_TOKEN=true</code> is only set by the CI workflow on
          ephemeral PR Railway environments. The endpoint is rate-limited. It
          can only mint tokens for users who already exist in the database.
        </p>

        <h3>Piece 2: A Postman Collection That Auto-Authenticates</h3>

        <p>
          The CI workflow generates a Postman collection from the PR backend's
          OpenAPI spec, then injects a collection-level pre-request script:
        </p>

        <div className="code-block" data-lang="javascript">
          <code>
{`const baseUrl = pm.variables.get("baseUrl");
const testEmail = pm.variables.get("testEmail");
const currentToken =
  pm.collectionVariables.get("authToken");

if (currentToken || !testEmail) { return; }

pm.sendRequest({
  url: baseUrl + "/auth/v2/dev-token",
  method: "POST",
  header: { "Content-Type": "application/json" },
  body: {
    mode: "raw",
    raw: JSON.stringify({ email: testEmail })
  }
}, function (err, res) {
  if (!err && res.code === 200) {
    pm.collectionVariables.set(
      "authToken", res.json().data.access_token
    );
  }
});`}
          </code>
        </div>

        <p>
          The flow for the reviewer: click "Run in Postman" in the PR comment,
          set <code>testEmail</code> once to a known dev account email. Done.
          Every request from now on auto-authenticates. Setup time goes from
          5-10 minutes to about 30 seconds.
        </p>

        <div className="pull-quote">
          Whatever your auth provider, if reviewers have to do a multi-step
          token dance, they won't test. Find a way to make a real token appear
          in their tool of choice with one click.
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 8 */}
        <h2>Layer 5: Changed Routes in the PR Comment</h2>

        <p>
          Even with the Postman collection ready, reviewers still had to figure
          out which routes were actually changed. The collection has hundreds of
          endpoints. Which ones do I care about?
        </p>

        <p>
          So we added a step that diffs the PR's OpenAPI spec against
          production's and lists the changes:
        </p>

        <div className="code-block" data-lang="bash">
          <code>
{`DIFF=$(jq -n \\
  --slurpfile pr /tmp/openapi-pr.json \\
  --slurpfile prod /tmp/openapi-prod.json '
  [
    ($pr[0].paths // {} | to_entries[]) as $e |
    ($e.value | keys[]) as $method |
    {
      path: $e.key,
      method: ($method | ascii_upcase),
      summary: ($e.value[$method].summary // ""),
      status: (
        if ($prod[0].paths // {})[$e.key] == null
          then "added"
        elif ... != ... then "modified"
        else "unchanged" end
      )
    } | select(.status != "unchanged")
  ]')`}
          </code>
        </div>

        <p>
          The result lands in the PR comment as a clean list of added and
          modified routes. Combined with the Postman collection, the reviewer
          knows exactly which routes changed, which Swagger tag to look in, and
          clicking a single button gets them an authenticated, ready-to-test
          request.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 9 */}
        <h2>The Unglamorous but Essential Part: Cleanup</h2>

        <p>
          Every preview environment we create on PR open, we delete on PR
          close. This is non-negotiable. The moment your "preview" system starts
          leaking environments, two things happen: your bill grows, and
          engineers stop trusting that closing a PR actually shuts things down.
        </p>

        <div className="code-block" data-lang="yaml">
          <code>
{`cleanup:
  if: github.event.action == 'closed'
  steps:
    - name: Delete Railway pr-N environment
    - name: Remove cruit-web branch env var
    - name: Remove cruit-backoffice branch env var
    - name: Delete Postman collection cruit-pr-N
    - name: Delete EAS branch pr-N
    - name: Update PR comment — cleanup notice`}
          </code>
        </div>

        <p>
          Each step is idempotent and fail-open: if the resource doesn't exist
          (because the PR never created one), we log a friendly message and
          move on. The PR comment gets updated to a "preview environment cleaned
          up" notice so anyone who comes back later isn't confused about why
          the links don't work.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 10 */}
        <h2>Gotchas and Small Lessons</h2>

        <p>
          <strong>Bash <code>UID</code> is readonly.</strong> The Postman API
          returns a <code>uid</code> for collections. The first version of our
          script tried to assign it to a bash variable named{" "}
          <code>UID</code>. That fails silently with "readonly variable"
          because <code>UID</code> is a built-in for the current user's UID.
          We renamed it to <code>COLLECTION_UID</code>.
        </p>

        <p>
          <strong><code>curl --data-binary "$BODY"</code> has an ARG_MAX
          limit.</strong> Cruit's OpenAPI spec generates a Postman collection of
          about 200KB. Passing that as a curl argument exceeds the OS
          argument-length limit and the request silently truncates. The fix is{" "}
          <code>--data-binary @file</code> to stream from disk instead.
        </p>

        <p>
          <strong>Railway's NEEDS_APPROVAL is undocumented.</strong> Railway can
          put deploys into a NEEDS_APPROVAL state for reasons we still don't
          fully understand. There's no toggle to disable it. We have a separate
          workflow that watches main pushes and auto-approves stuck deploys.
        </p>

        <p>
          <strong>Vercel's per-branch env vars are fiddly.</strong> You have to
          PATCH if it exists, POST if it doesn't, and you need to check by both{" "}
          <code>key</code> <em>and</em> <code>gitBranch</code> to find the
          existing one.
        </p>

        <p>
          <strong>EAS <code>update --json</code> returns an array.</strong> One
          entry per platform. iOS and Android share{" "}
          <code>manifestPermalink</code>, so we just take the first non-empty
          value. If you naively grab <code>[0]</code> without filtering for
          non-null, you'll occasionally get bitten when one platform fails.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 11 */}
        <h2>Cost Analysis</h2>

        <p>
          For a team doing about <span className="num-highlight">50</span> PRs/month:
        </p>

        <div className="arch-diagram">
          <pre>
{`  Job               Cost/run    Frequency    Monthly
  ─────────────────────────────────────────────────
  triage            ~0.2 min    50           10 min
  web-preview (L)   ~0.5 min    25           12.5 min
  web-preview (H)   ~7-8 min    20           160 min
  backoffice        ~0.5 min    5            2.5 min
  mobile            ~3-4 min    10           35 min
  cleanup           ~0.8 min    50           40 min
  ─────────────────────────────────────────────────
  Total                                      ~260 min`}
          </pre>
        </div>

        <p>
          Well within GitHub Actions' free{" "}
          <span className="num-highlight">2000</span> min/month for private
          repos. Railway costs went up by maybe 5-10%. EAS Update is unmetered.
          Postman API calls are free at our volume.
        </p>

        <div className="callout">
          <p>
            <strong>The cost story matters:</strong> The moment a preview system
            gets expensive enough to be a line item in a monthly review, it
            stops being a tool and starts being a budget conversation. We
            engineered for "fits in the free tier" because it removes the
            political dimension entirely.
          </p>
        </div>

        <div className="sep">· · ·</div>

        {/* SECTION 12 */}
        <h2>What This Changed for Us</h2>

        <p>
          <strong>Reviewers actually test.</strong> Look at any recent PR thread
          and you'll see screenshots of the deployed preview, results from
          Postman runs, screen recordings from the mobile app. None of that was
          happening at this volume before.
        </p>

        <p>
          <strong>Bugs get caught at PR review, not after merge.</strong> The
          shape-of-response bugs, the broken-auth-flow bugs, the "this works on
          my machine" bugs — all of these now surface during review, on a real
          backend, in front of a reviewer who's actually clicked the link.
        </p>

        <p>
          <strong>Backend devs ship more confidently.</strong> The Postman
          auto-auth removed the last excuse for not testing your own endpoint
          before asking for review. Most backend PRs now show up with the
          author already knowing the change works at the API level.
        </p>

        <p>
          <strong>Mobile review went from "not really an option" to "scan
          and done."</strong> Before, mobile changes shipped largely untested at
          the PR stage. Now anyone on the team can scan a QR on their phone and
          validate a UI tweak before the PR even merges.
        </p>

        <div className="sep">· · ·</div>

        {/* SECTION 13 */}
        <h2>The Takeaway</h2>

        <p>
          The thing I want other teams to take away from this isn't the specific
          workflow file. Your stack is probably different. The specific APIs
          change but the principles don't:
        </p>

        <p>
          <strong>Optimize for activation energy, not features.</strong> A
          preview system that requires 10 setup steps to use isn't a preview
          system. It's a documentation page describing one.
        </p>

        <p>
          <strong>Pay only for what changes.</strong> Triage everything. Most
          PRs don't need most environments.
        </p>

        <p>
          <strong>Auto-auth is the unlock.</strong> Whatever your auth provider,
          if reviewers have to do a multi-step token dance, they won't test.
        </p>

        <p>
          <strong>Cleanup is as important as setup.</strong> A system that
          silently leaks environments will be torn down by the engineer holding
          the bill long before it gets adopted by the wider team.
        </p>

        <p>
          <strong>Make the PR comment the single source of truth.</strong> Don't
          make people hunt across dashboards. Backend URL, frontend URL, mobile
          QR, Postman button, changed routes — all in one comment that updates
          on every push.
        </p>

        <div className="pull-quote">
          We went from "code review barely involves running the code" to "every
          PR comes with a fully-wired environment that auto-authenticates the
          reviewer." It's not glamorous infrastructure work. But the day-to-day
          quality of life it bought our team has been one of the
          highest-leverage investments we've made.
        </div>

        <div className="sep">· · ·</div>

        <div className="author-card">
          <div className="author-avatar">CI</div>
          <div className="author-info">
            <div className="author-name">One-Click PR Previews</div>
            <div className="author-bio">
              A fully automated preview environment system — ephemeral Railway
              backends, Vercel frontends, EAS mobile OTA, and auto-authenticated
              Postman collections. Built with GitHub Actions.
            </div>
          </div>
        </div>
      </article>

      <footer className="article-footer">
        Written with care · Powered by the belief that nobody should have to
        copy-paste a JWT from browser DevTools
      </footer>
    </div>
  );
};
