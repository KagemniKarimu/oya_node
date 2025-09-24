/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                        🌪️  OYA PROTOCOL NODE  🌪️                          ║
 * ║                          Startup Banner Utility                            ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 *
 * ASCII art banner displayed on node startup.
 *
 * @packageDocumentation
 */
/**
 * Display startup banner for OYA Protocol Node
 *
 * Shows ASCII art and version information on node startup.
 *
 * @public
 */
export function displayBanner() {
    const purple = '\x1b[35m';
    const cyan = '\x1b[36m';
    const bold = '\x1b[1m';
    const reset = '\x1b[0m';
    console.log(`
${purple}╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║      ${cyan}██████${purple}  ██    ██  ${cyan}█████${purple}      ███    ██  ${cyan}██████${purple}  ██████  ███████      ║
║     ${cyan}██    ██${purple} ╚██  ██╝ ${cyan}██   ██${purple}     ████   ██ ${cyan}██    ██${purple} ██   ██ ██           ║
║     ${cyan}██    ██${purple}  ╚████╝  ${cyan}███████${purple}     ██ ██  ██ ${cyan}██    ██${purple} ██   ██ █████        ║
║     ${cyan}██    ██${purple}   ╚██╝   ${cyan}██   ██${purple}     ██  ██ ██ ${cyan}██    ██${purple} ██   ██ ██           ║
║      ${cyan}██████${purple}     ██    ${cyan}██   ██${purple}     ██   ████  ${cyan}██████${purple}  ██████  ███████      ║
║                                                                           ║
║                        ${bold}🌪️  NATURAL LANGUAGE PROTOCOL  🌪️${reset}${purple}                    ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝${reset}
`);
}
/**
 * Display compact startup message
 *
 * Alternative to full banner for production environments.
 *
 * @public
 */
export function displayCompactBanner() {
    const purple = '\x1b[35m';
    const bold = '\x1b[1m';
    const reset = '\x1b[0m';
    console.log(`${purple}${bold}
═══════════════════════════════════════════════════════════════
    🌪️  OYA NODE - Natural Language Protocol  🌪️
═══════════════════════════════════════════════════════════════${reset}
`);
}
