import { describe, it, expect } from 'vitest';
import { 
  ForecastParamsSchema, 
  ArchiveParamsSchema, 
  AirQualityParamsSchema, 
  MarineParamsSchema, 
  ElevationParamsSchema,
  GeocodingParamsSchema,
  LocationSchema 
} from './types.js';
import { ALL_TOOLS } from './tools.js';
import { OpenMeteoClient } from './client.js';

// Basic import tests
describe('Module imports', () => {
  it('should import types successfully', () => {
    expect(ForecastParamsSchema).toBeDefined();
    expect(ArchiveParamsSchema).toBeDefined();
    expect(AirQualityParamsSchema).toBeDefined();
    expect(MarineParamsSchema).toBeDefined();
    expect(ElevationParamsSchema).toBeDefined();
    expect(GeocodingParamsSchema).toBeDefined();
    expect(LocationSchema).toBeDefined();
  });

  it('should validate coordinates schema', () => {
    const validParams = {
      latitude: 48.8566,
      longitude: 2.3522
    };
    
    expect(() => ForecastParamsSchema.parse(validParams)).not.toThrow();
    
    const invalidParams = {
      latitude: 91, // Invalid latitude
      longitude: 2.3522
    };
    
    expect(() => ForecastParamsSchema.parse(invalidParams)).toThrow();
  });

  it('should validate geocoding parameters', () => {
    const validGeocodingParams = {
      name: 'Paris',
      count: 5
    };
    
    expect(() => GeocodingParamsSchema.parse(validGeocodingParams)).not.toThrow();
    
    const invalidGeocodingParams = {
      name: 'P', // Too short
      count: 5
    };
    
    expect(() => GeocodingParamsSchema.parse(invalidGeocodingParams)).toThrow();
  });

  it('should import tools successfully', () => {
    expect(ALL_TOOLS).toBeDefined();
    expect(Array.isArray(ALL_TOOLS)).toBe(true);
    expect(ALL_TOOLS.length).toBeGreaterThan(0);
    
    // Vérifier que l'outil de géocodage est présent
    const geocodingTool = ALL_TOOLS.find(tool => tool.name === 'geocoding');
    expect(geocodingTool).toBeDefined();
    expect(geocodingTool?.description).toContain('Rechercher des emplacements');
  });

  it('should import client successfully', () => {
    expect(OpenMeteoClient).toBeDefined();
    const client = new OpenMeteoClient();
    expect(client).toBeInstanceOf(OpenMeteoClient);
  });
}); 