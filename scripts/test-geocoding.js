#!/usr/bin/env node

/**
 * Script de test simple pour démontrer la fonctionnalité de géocodage
 * Usage: node scripts/test-geocoding.js [nom_lieu]
 */

import { OpenMeteoClient } from '../dist/client.js';

async function testGeocoding() {
    const client = new OpenMeteoClient();
    const searchTerm = process.argv[2] || 'Paris';
    
    console.log(`🔍 Recherche de "${searchTerm}"...`);
    
    try {
        const result = await client.getGeocoding({
            name: searchTerm,
            count: 5
        });
        
        console.log('\n📍 Résultats trouvés:');
        console.log('='.repeat(50));
        
        result.results.forEach((location, index) => {
            console.log(`\n${index + 1}. ${location.name}`);
            console.log(`   📍 Coordonnées: ${location.latitude}, ${location.longitude}`);
            console.log(`   🌍 Pays: ${location.country || 'N/A'} (${location.country_code || 'N/A'})`);
            console.log(`   🗺️  Région: ${location.admin1 || 'N/A'}`);
            console.log(`   📏 Altitude: ${location.elevation || 'N/A'}m`);
            console.log(`   👥 Population: ${location.population?.toLocaleString() || 'N/A'}`);
            console.log(`   🕒 Fuseau horaire: ${location.timezone || 'N/A'}`);
            if (location.postcodes && location.postcodes.length > 0) {
                console.log(`   📮 Codes postaux: ${location.postcodes.join(', ')}`);
            }
        });
        
        if (result.results.length === 0) {
            console.log('\n❌ Aucun résultat trouvé pour ce terme de recherche.');
        }
        
    } catch (error) {
        console.error('\n❌ Erreur lors de la recherche:', error.message);
    }
}

// Exemple d'utilisation
console.log('🌍 Test du géocodage Open-Meteo MCP');
console.log('=====================================');

testGeocoding().catch(console.error); 