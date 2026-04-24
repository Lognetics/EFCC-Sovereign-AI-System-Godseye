# ---------------------------------------------------------------------------
# GOD'S EYE (GE-NFIIS) — one-shot publish script
# Creates the repo under lognetics, pushes, and enables GitHub Pages.
# Run from the repo root:   powershell -ExecutionPolicy Bypass -File .\publish.ps1
# Optional:                 .\publish.ps1 -RepoName godseye-ge-nfiis -Visibility public
# ---------------------------------------------------------------------------

param(
    [string] $Owner      = 'lognetics',
    [string] $RepoName   = 'EFCC-Sovereign-AI-System-Godseye',
    [ValidateSet('public','private')]
    [string] $Visibility = 'public'
)

$ErrorActionPreference = 'Stop'

# --- Ensure gh is on PATH (covers a freshly-installed gh in current shell) ---
$ghCandidates = @(
    'gh',
    'C:\Program Files\GitHub CLI\gh.exe',
    "$env:LOCALAPPDATA\Programs\GitHub CLI\gh.exe"
)
$gh = $null
foreach ($c in $ghCandidates) {
    if (Get-Command $c -ErrorAction SilentlyContinue) { $gh = $c; break }
    if (Test-Path $c) { $gh = $c; break }
}
if (-not $gh) {
    Write-Host "gh CLI not found. Install with:  winget install --id GitHub.cli --source winget" -ForegroundColor Red
    exit 1
}
Write-Host ">> Using gh at: $gh" -ForegroundColor DarkGray

# --- Auth ---
Write-Host ">> Checking GitHub auth..." -ForegroundColor Cyan
& $gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host ">> Not logged in. Starting browser login (lognetics account)..." -ForegroundColor Yellow
    & $gh auth login --hostname github.com --git-protocol https --web --scopes "repo,workflow"
    if ($LASTEXITCODE -ne 0) { Write-Host "Login failed." -ForegroundColor Red; exit 1 }
}

# --- Confirm signed-in user ---
$who = (& $gh api user --jq .login).Trim()
Write-Host ">> Signed in as: $who" -ForegroundColor Green

# --- Create the repo (idempotent) ---
$full = "$Owner/$RepoName"
Write-Host ">> Ensuring repo $full exists..." -ForegroundColor Cyan
$exists = $true
& $gh repo view $full 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    $exists = $false
    & $gh repo create $full --$Visibility --disable-wiki --description "GOD'S EYE — EFCC Sovereign AI System (GE-NFIIS). Synthetic-data demo UI."
    if ($LASTEXITCODE -ne 0) { Write-Host "Repo create failed (check you have permission on '$Owner')." -ForegroundColor Red; exit 1 }
}
if ($exists)  { Write-Host "   repo already exists — continuing." -ForegroundColor DarkGray }
if (-not $exists) { Write-Host "   repo created." -ForegroundColor Green }

# --- Remote + push ---
$remoteUrl = "https://github.com/$full.git"
$currentRemote = (git remote get-url origin 2>$null)
if ($LASTEXITCODE -ne 0) {
    git remote add origin $remoteUrl
} elseif ($currentRemote -ne $remoteUrl) {
    git remote set-url origin $remoteUrl
}

Write-Host ">> Pushing main to $full..." -ForegroundColor Cyan
git push -u origin main
if ($LASTEXITCODE -ne 0) { Write-Host "Push failed." -ForegroundColor Red; exit 1 }

# --- Enable Pages (Actions source) ---
Write-Host ">> Enabling GitHub Pages (Actions source)..." -ForegroundColor Cyan
$body = '{"build_type":"workflow"}'
& $gh api --method POST -H "Accept: application/vnd.github+json" "repos/$full/pages" -f build_type=workflow 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    # Already exists? Try PUT to update source.
    & $gh api --method PUT -H "Accept: application/vnd.github+json" "repos/$full/pages" -f build_type=workflow 2>$null | Out-Null
}

# --- Kick the deploy workflow (in case it hasn't auto-run yet) ---
Start-Sleep -Seconds 2
& $gh workflow run "deploy-pages.yml" --repo $full 2>$null | Out-Null

Write-Host ""
Write-Host "=============================================================" -ForegroundColor Green
Write-Host " Repo:   https://github.com/$full"
Write-Host " Action: https://github.com/$full/actions"
Write-Host " Pages:  https://$Owner.github.io/$RepoName/"
Write-Host "=============================================================" -ForegroundColor Green
Write-Host " Pages will be live ~60-120s after the first successful run." -ForegroundColor DarkGray
