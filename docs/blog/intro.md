# The pain point

Like many of you, I started working with AI in chat.

Sometimes, I'd be on my phone using the mobile app or other times
on my desktop dev machine. Starting a new chat/session was pretty much a reflex as the context window filled up or I wanted
to take the results of that conversation and plug it into a new chat.

**I quickly learned that if you point a model or coding agent toward a task, it fills in the constraints/best practices with
skewing toward the average and guessing to fill in the gaps.** This is sometimes totally fine and even what you want. It lets you explore
new concepts, a large number of combinations, or do effective market research. It's an ideal state when you want a larger possibility space for the model to explore and present its recommendations.

**But for a lot of implementation-based tasks (software architecture, feature coding, visual design), I found this approach got me pretty generic, inconsistent, and unshippable results.** Especially anything to do with code artifacts. There's a tremendous amount of combinations of LLM-generated code in a statically-typed language that will technically "compile". Go to TypeScript or Python and you start finding errors at runtime not compile-time and the LLM will hand you references to hard-coded properties on plain objects instead of clean TypeScript interfaces.

**The other big takeaway I noticed was what happened when you defined the chat/session with a clear identity.** Give an LLM a clear, unambigous identity/role to adopt from the start (you are a Staff Frontend Software Engineer, or Distinguished Rust Engineer instead of no identity) and the results from the first chat and subsequent turns improved a lot.

**Another benefit: because that direction was in the context window, following responses/turns started to sound more cohesive and would voice more opinionated, idiomatic suggestions instead of skewing toward the average.** I saw this yielded a decrease in the amount of anti-patterns, tech debt, and architecture concerns because the identity acted as a guardrail of sorts. Not perfect, or deterministic but good enough to filter out bad code.

**In classic engineer fashion, I took these pain points and built a tool.**

# Jaspurr

Jaspurr is a small web app: you pick a role, answer a few questions (depending on the role), and get a structured prompt to paste
into whatever model you use. First commit **2026-06-03**, **~90 PRs**, **one person**.

Here is the rough shape of those **~90 PRs**, which turned out to be the most interesting thing about the project:

| PRs    | When      | What landed                                                                                                              |
| ------ | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| #1–19  | Jun 3–11  | Strict TypeScript, typechecked ESLint, Prettier, a check script, a pre-commit hook, CI, Vitest, CSP headers              |
| #20–29 | Jun 19–24 | Core data types, `sanitize()`, serialization, app state — pure functions, no UI                                          |
| #30–55 | Jul 2–9   | Design tokens, UI primitives, CSS layer/scale/radius/motion/spacing files, a reset layer, a component workbench, routing |
| #56–74 | Jul 16–20 | The entire product: scaffold types, prompt assembly, the flow, the library, the landing page                             |
| #75–78 | Jul 21    | Per-role abstraction, then three complete new roles the same day                                                         |

I authored 19 pull requests before touching a single line of product code. Five weeks before
anything a person could use or see in a browser. Then the whole product came together in about four working days,
and three new roles shipped in a single day.

**I would like to claim I planned that curve. I did not. But I have a decent
theory about why it happened.**

## I built foundations deliberately and by hand

**Starting the project and knowing it was going to be TypeScript, I was pretty particular about the project foundations.** I didn't
want to deal with npm/yarn version mismatches locally and on CI so devcontainers. I wanted a sane CI pipeline that ran locally as well as blocking PRs from main to have a deterministic layer around any change. Tests had to exist. I wanted CSS to be consistent instead of a bunch of brittle values scattered everywhere.

I knew it was unavoidable to have **some** external dependencies but I wanted a lean dependency tree for security reasons and to have a much easier codebase to reason about that doesn't have multi-level transitive dependencies that affect functionality.

TypeScript's kind of unique environment forces you to opt into all of these checks (via `tsc` or `eslint`) and do your own research to configure them with strict settings. I spent the time reading docs and configuring with very strict settings.

**For awhile, it felt like I was building tooling but not an actual tool. Then the wins started to accumulate:**

### Pure Functions

**I had a clear separation of pure functions / state / UI so React components
and the underlying UI are just downstream consumers of pure, TypeScript logic that is unit-tested.** My first version of the UI came together really fast and with no errors because all of the data it consumed had been tested and was stable.

State followed a similar pattern, I spent a lot of time researching state libraries and eventually settled on Jotai since the graph-like structure mapped well to the way data flowed through the application. The flow through the app is modeled as a Jotai reducer:
`(state, action) => state`. No DOM, no mocks, no render. Keeping that state logic out of the UI was huge and paid dividends later when features started landing more frequently with AI.

### Design Tokens

**I spent time building a design token CSS layer.** After PR #30 there was no
open question about what "the border color" is. There is a token. A generated
component either uses it or fails review in an obvious way. This ended up being huge for self-documenting patterns in the codebase
that agents automatically pick up instead of force-feeding via markdown in the repo.

### TypeScript data as code

**I also knew early that I wanted the roles themselves to be data as code.** I didn't want a run-time fetch externally so the content would be bundled into the application. JSON/YAML means you have to parse, validate and map via Zod or something else. TypeScript `satisfies` + `tsc` gives us these checks for free at compile-time, not run-time.

The roles themselves (Software Engineer, Designer,etc.) are plain data,
written as `as const satisfies Role`. A select question missing its options, a
section missing a heading, a status outside `'ready' | 'coming-soon'` results in a failure locally and can't be merged on origin.

### Local/CI Gates

**A gate makes "looks right" and "is right" the same check.** `pnpm check` runs
lint, typecheck and tests. It runs on a pre-commit hook and again in CI on every
PR. This matters more than it sounds like, and I'll circle back to it later.

None of the early-project steps are particularly novel. It is the boring list of things we know we _should_ do before writing code. The point is the ordering discipline: all of
it existed _before_ there was a product to build, which meant that when I did
start building the product, the number of open questions per feature was close
to zero.

## The part where I do lean on the model

**I used Claude the whole project, and Claude Code once there was a repo mature enough to point at.**

The thing I would emphasize is that the amount of rope I gave Claude went _up_ as
the scaffolding went in, and that was not a coincidence.

Early on Claude was a pair programmer and a second opinion, not an author. Gut
checks on what idiomatic TypeScript looks like for a given shape. A second read
on a dependency choice, never the deciding one. I'd still go and look at docs externally
to validate and question the findings. Bash plumbing for the check and
build scripts. But a human was firmly in the loop for all of it: I opened the
PRs by hand, set up CI and permissions by hand, and read every diff.

### Agentic coding wins

**When I did start handing over real feature work, I ran Claude Code read-only first, especially for refactors.** The model's output was a proposal I reviewed rather than a change I discovered later. When something was wrong at this stage, I resisted the urge to reach for the easy solution of having Claude fix it and resolved it by hand instead of re-rolling until it looked fine or seemed to work.

That discipline habit is the real win: **compiling
is not the bar, writing maintainable, well-tested, and scoped code is.**

Code from a frontier model that typechecks and passes tests can
still be duplicative, sloppy, or subtly not how this codebase does things. I
pushed back on all three, constantly.

The failure mode with a good / bleeding-edge model is not
that it writes broken code, it rarely does (especially on the upper-tier reasoning models). It is that it writes plausible code, almost too perfect, and
that quietly **drags your codebase toward the average of every codebase it's been trained on.** When you dig deeper, you start seeing PRs which includes all of the fun anti-patterns, bad practices, and misapplied fancy architecture or unnecessary syntactic sugar present in the data.

**Today, Claude Code is fully unlocked in this repo and can open its own PRs.** That
is not because I got more relaxed. It is because there is now enough structure baked into the repo itself
that "wrong" shows up as a failed check on the local/CI pipeline or an obvious drift from the idiomatic code shape, rather
than as something I have to notice by reading carefully at midnight.

## The tool kind of built itself

**Here is the part I did not plan.**

To build the UI, I was writing long prompts to explore visual directions,
establish a design identity, and trying to stay consistent with an existing language/set of CSS standards. This instinct toward consistency (similar to coding side) led to me continuing to refine and reuse prompt templates in raw Markdown that yielded the highest-fidelity results.

**Those prompts are now the product.** The Visual Designer role and the Frontend
Engineer role are cleaned-up, parameterized versions of the raw markdown prompts I had
already been pasting into Claude to build Jaspurr itself. The questions each
role asks are the questions I kept having to answer by hand.

It's a small detail but it is the most pure signal I have that Jaspurr has validity: **the tool's first real user was the project that made it.**

## Going forward

Everyone is currently trying to get better output by writing better prompts or optimizing their agentic harness (myself included!).
That works, up to the point where the missing information is something structural not inferred, it lives in the repo, and no amount of re-rolling will fix it.

**So I built the thing that at least helps remove some of the guessing.** A distinct identity per chat/session. Clear constraints on what is idiomatic and what the user should expect as model output. Then let the model run and see it work.

Jaspurr is super early but I'm really excited to have other developers and technical folks working in AI try it out. If there's roles or actions you think should exist, let me know!

Code: <https://github.com/jaspurr-dev/jaspurr>
Product: <https://jaspurr.dev>
