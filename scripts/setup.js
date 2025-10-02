#!/usr/bin/env bun
/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                        🌪️  OYA PROTOCOL NODE  🌪️                          ║
 * ║                           Project Setup Script                            ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 *
 * Installs dependencies and sets up the oya command globally.
 */

import { execSync } from 'child_process'
import chalk from 'chalk'

console.log(chalk.cyan('\n🌪️  Oya Node Setup\n'))

try {
	console.log(chalk.yellow('📦 Installing dependencies...'))
	execSync('bun install', { stdio: 'inherit' })
	console.log(chalk.green('✓ Dependencies installed\n'))

	console.log(chalk.yellow('🔗 Linking oya command globally...'))
	execSync('bun link', { stdio: 'inherit' })
	console.log(chalk.green('✓ oya command linked\n'))

	console.log(chalk.green.bold('🎉 Setup complete!\n'))
	console.log(chalk.cyan('Next steps:'))
	console.log(chalk.gray('  1. Copy .env.example to .env and configure'))
	console.log(chalk.gray('  2. Run: oya db:create'))
	console.log(chalk.gray('  3. Run: oya db:setup'))
	console.log(chalk.gray('  4. Run: oya start\n'))
} catch (error) {
	console.error(chalk.red('\n❌ Setup failed:'), error.message)
	process.exit(1)
}
