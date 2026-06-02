$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $repoRoot "screenshots"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$staleFiles = @(
  "02-benchmark-register-proof.png",
  "03-comparison-matrix-proof.png"
)

foreach ($staleFile in $staleFiles) {
  $stalePath = Join-Path $outputDir $staleFile
  if (Test-Path $stalePath) {
    Remove-Item $stalePath -Force
  }
}

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Path,
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets
  )

  $width = 1600
  $height = 900
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::FromArgb(7, 17, 29))

  $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(13, 26, 43))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(103, 224, 190), 2)
  $titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(237, 242, 255))
  $bodyBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(159, 176, 207))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(103, 224, 190))

  $fontTitle = New-Object System.Drawing.Font("Georgia", 40, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
  $fontFooter = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

  $rect = New-Object System.Drawing.Rectangle 20, 20, 1560, 820
  $graphics.FillRectangle($bgBrush, $rect)
  $graphics.DrawRectangle($panelPen, $rect)

  $graphics.DrawString("Portfolio Benchmark Scorebook", $fontSub, $accentBrush, 70, 85)
  $graphics.DrawString($Title, $fontTitle, $titleBrush, 70, 150)
  $graphics.DrawString($Subtitle, $fontBody, $bodyBrush, (New-Object System.Drawing.RectangleF(70, 240, 1380, 110)))

  $y = 360
  foreach ($bullet in $Bullets) {
    $graphics.FillEllipse($accentBrush, 85, $y + 13, 12, 12)
    $graphics.DrawString($bullet, $fontBody, $titleBrush, 110, $y)
    $y += 84
  }

  $graphics.DrawString("Synthetic proof render for README packaging.", $fontFooter, $bodyBrush, 70, 770)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $graphics.Dispose()
  $bitmap.Dispose()
}

New-ScenarioImage -Path (Join-Path $outputDir "01-overview-proof.png") -Title "Board-facing scorebook ranks stay visible before capital gets allocated" -Subtitle "This scorebook turns portfolio strength, proof depth, commercial pull, repeatability, and execution drag into one board-readable ranking surface." -Bullets @(
  "Which lanes are strong enough to lead the board and investor story now.",
  "Where missing proof or execution drag is still too high to justify heavier investment.",
  "What should invest, maintain, watch, or deprioritize before the next portfolio review."
)

New-ScenarioImage -Path (Join-Path $outputDir "02-scorebook-register-proof.png") -Title "Scorebook register keeps each lane, tier, owner, and action attached" -Subtitle "Every route retains the scorebook tier, portfolio story, owner, board audience, and next move." -Bullets @(
  "Each lane stays connected to one accountable owner and one board-facing audience.",
  "Weak ranking language is visible before it becomes the headline story.",
  "The next corrective move sits next to the lane instead of disappearing into another memo."
)

New-ScenarioImage -Path (Join-Path $outputDir "03-benchmark-tiers-proof.png") -Title "Benchmark tiers show where the growth story outruns the proof" -Subtitle "Missing proof, weak pull, low repeatability, and excess drag remain visible in one scorebook layer." -Bullets @(
  "Missing proof is explicit instead of implied.",
  "Scorebook strength, proof depth, pull, and repeatability are readable at a glance.",
  "Each lane ties to a concrete investment or cleanup move."
)

New-ScenarioImage -Path (Join-Path $outputDir "04-investment-posture-proof.png") -Title "Investment posture keeps capital decisions grounded in owners and drag" -Subtitle "Composite priority, execution drag, and next moves stay grounded in the same operating view." -Bullets @(
  "Invest and maintain calls stay tied to one owner and one drag score.",
  "Watch and deprioritize decisions are readable before the next capital cycle.",
  "Boards, investors, and operators can see what should move first."
)
