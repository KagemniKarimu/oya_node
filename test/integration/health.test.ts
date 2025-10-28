/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                        🌪️  OYA PROTOCOL NODE  🌪️                          ║
 * ║                       Health Endpoint Integration Tests                   ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import { describe, it, expect, beforeAll, afterAll } from 'bun:test'
import { startTestServer, stopTestServer, get } from '../helpers/testServer.js'
import type { Server } from 'http'

describe('Health Endpoint', () => {
	let server: Server
	let baseURL: string

	beforeAll(async () => {
		const testServer = await startTestServer()
		server = testServer.server
		baseURL = testServer.baseURL
	})

	afterAll(async () => {
		await stopTestServer(server)
		// Note: Don't call pool.end() here as other tests may share the same pool
		// The pool will be cleaned up when the test process exits
	})

	it('should return 200 OK on /health', async () => {
		const response = await get(baseURL, '/health')
		expect(response.status).toBe(200)
	})

	it('should return healthy status in response body', async () => {
		const response = await get(baseURL, '/health')
		const data = await response.json()
		expect(data.status).toBe('healthy')
	})
})
