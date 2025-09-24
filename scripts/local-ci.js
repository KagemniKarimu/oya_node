#!/usr/bin/env node

import { execSync } from 'child_process'
import chalk from 'chalk'

// ASCII Art for headers
const ASCII_HEADER = `
╔═════════════════════════════════════════════════════════════════════╗
║                                                                     ║
║     ██████╗ ██╗   ██╗ █████╗     ███╗   ██╗ ██████╗ ██████╗ ██████╗ ║
║    ██╔═══██╗╚██╗ ██╔╝██╔══██╗    ████╗  ██║██╔═══██╗██╔══██╗██╔══██╗║
║    ██║   ██║ ╚████╔╝ ███████║    ██╔██╗ ██║██║   ██║██║  ██║█████╗  ║
║    ██║   ██║  ╚██╔╝  ██╔══██║    ██║╚██╗██║██║   ██║██║  ██║██╔══╝  ║
║    ╚██████╔╝   ██║   ██║  ██║    ██║ ╚████║╚██████╔╝██████╔╝███████╗║
║     ╚═════╝    ╚═╝   ╚═╝  ╚═╝    ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝║
║                                                                     ║
║                    LOCAL CI PIPELINE                                ║
╚═════════════════════════════════════════════════════════════════════╝
`

const STAGE_SEPARATORS = {
	lint: `
┌─────────────────────────────────────────────────────────────┐
│  🔍 STAGE 1: LINTING                                        │
├─────────────────────────────────────────────────────────────┤
│  Checking code quality with ESLint...                       │
└─────────────────────────────────────────────────────────────┘
`,
	format: `
┌─────────────────────────────────────────────────────────────┐
│  🎨 STAGE 2: FORMATTING                                     │
├─────────────────────────────────────────────────────────────┤
│  Verifying code style with Prettier...                      │
└─────────────────────────────────────────────────────────────┘
`,
	types: `
┌─────────────────────────────────────────────────────────────┐
│  🏷️  STAGE 3: TYPE CHECKING                                 │
├─────────────────────────────────────────────────────────────┤
│  Validating TypeScript types...                             │
└─────────────────────────────────────────────────────────────┘
`,
	test: `
┌─────────────────────────────────────────────────────────────┐
│  🧪 STAGE 4: TESTING                                        │
├─────────────────────────────────────────────────────────────┤
│  Running test suite...                                      │
└─────────────────────────────────────────────────────────────┘
`,
	success: `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     ███████╗██╗   ██╗ ██████╗ ██████╗███████╗███████╗███████╗ ║
║     ██╔════╝██║   ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝ ║
║     ███████╗██║   ██║██║     ██║     █████╗  ███████╗███████╗ ║
║     ╚════██║██║   ██║██║     ██║     ██╔══╝  ╚════██║╚════██║ ║
║     ███████║╚██████╔╝╚██████╗╚██████╗███████╗███████║███████║ ║
║     ╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝ ║
║                                                               ║
║                  ✅ All checks passed! ✅                     ║
╚═══════════════════════════════════════════════════════════════╝
`,
	failure: `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     ███████╗ █████╗ ██╗██╗     ███████╗██████╗                ║
║     ██╔════╝██╔══██╗██║██║     ██╔════╝██╔══██╗               ║
║     █████╗  ███████║██║██║     █████╗  ██║  ██║               ║
║     ██╔══╝  ██╔══██║██║██║     ██╔══╝  ██║  ██║               ║
║     ██║     ██║  ██║██║███████╗███████╗██████╔╝               ║
║     ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═════╝                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`,
}

// Run command with nice output
function runStage(stageName, command, description) {
	console.log(chalk.cyan(STAGE_SEPARATORS[stageName]))
	console.log(chalk.gray(`  ${description}...`))

	try {
		const startTime = Date.now()
		const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' })
		const duration = ((Date.now() - startTime) / 1000).toFixed(2)

		console.log(chalk.green(`  ✓ Complete (${duration}s)`))

		// Show compact output if there are warnings
		if (output.includes('warning')) {
			console.log(
				chalk.yellow(
					'  ⚠️  Warnings detected (run command directly for details)'
				)
			)
		}

		return true
	} catch (error) {
		console.log(chalk.red(`  ✗ Failed`))
		console.log(chalk.red('\nError output:'))
		console.log(error.stdout || error.message)
		return false
	}
}

// Main CI pipeline
async function main() {
	console.clear()
	console.log(chalk.blue.bold(ASCII_HEADER))
	console.log(chalk.gray('Starting continuous integration checks...\n'))

	const startTime = Date.now()
	const results = []

	// Stage 1: Linting
	results.push(runStage('lint', 'npm run lint', 'Running ESLint'))
	if (!results[results.length - 1]) {
		console.log(chalk.red(STAGE_SEPARATORS.failure))
		console.log(chalk.red('❌ CI failed at linting stage'))
		process.exit(1)
	}

	// Stage 2: Format checking
	results.push(
		runStage('format', 'npm run format.check', 'Checking Prettier formatting')
	)
	if (!results[results.length - 1]) {
		console.log(chalk.red(STAGE_SEPARATORS.failure))
		console.log(chalk.red('❌ CI failed at formatting stage'))
		console.log(
			chalk.yellow('💡 Tip: Run "npm run format" to auto-fix formatting')
		)
		process.exit(1)
	}

	// Stage 3: Type checking
	results.push(
		runStage('types', 'npm run types.check', 'Checking TypeScript types')
	)
	if (!results[results.length - 1]) {
		console.log(chalk.red(STAGE_SEPARATORS.failure))
		console.log(chalk.red('❌ CI failed at type checking stage'))
		process.exit(1)
	}

	// Stage 4: Testing
	results.push(runStage('test', 'npm run test', 'Running test suite'))
	if (!results[results.length - 1]) {
		console.log(chalk.red(STAGE_SEPARATORS.failure))
		console.log(chalk.red('❌ CI failed at testing stage'))
		process.exit(1)
	}

	// Success!
	const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2)
	console.log(chalk.green.bold(STAGE_SEPARATORS.success))
	console.log(
		chalk.green(
			`\n🎉 All CI checks completed successfully in ${totalDuration}s!\n`
		)
	)

	// Summary
	console.log(chalk.cyan('📊 Summary:'))
	console.log(chalk.green('  ✓ Linting: Passed'))
	console.log(chalk.green('  ✓ Formatting: Passed'))
	console.log(chalk.green('  ✓ Type Checking: Passed'))
	console.log(chalk.green('  ✓ Tests: Passed'))
	console.log()
}

// Run the CI
main().catch((error) => {
	console.error(chalk.red('Unexpected error:'), error)
	process.exit(1)
})
