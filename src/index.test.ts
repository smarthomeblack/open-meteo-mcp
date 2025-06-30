import { describe, it, expect } from 'vitest';

// Basic import tests
describe('Module imports', () => {
  it('should import types successfully', async () => {
    const { CoordinateSchema } = await import('./types');
    expect(CoordinateSchema).toBeDefined();
    expect(CoordinateSchema.parse).toBeDefined();
  });

  it('should validate coordinates schema', async () => {
    const { CoordinateSchema } = await import('./types');
    
    // Valid coordinates
    const valid = { latitude: 48.8566, longitude: 2.3522 };
    expect(() => CoordinateSchema.parse(valid)).not.toThrow();
    
    // Invalid coordinates
    const invalid = { latitude: 200, longitude: 2.3522 };
    expect(() => CoordinateSchema.parse(invalid)).toThrow();
  });

  it('should import tools successfully', async () => {
    const { ALL_TOOLS } = await import('./tools');
    expect(ALL_TOOLS).toBeDefined();
    expect(Array.isArray(ALL_TOOLS)).toBe(true);
    expect(ALL_TOOLS.length).toBeGreaterThan(0);
  });

  it('should import client successfully', async () => {
    const { OpenMeteoClient } = await import('./client');
    expect(OpenMeteoClient).toBeDefined();
  });
}); 