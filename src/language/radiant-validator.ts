import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { RadiantAstType, Person } from './generated/ast.js';
import type { RadiantServices } from './radiant-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: RadiantServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.RadiantValidator;
    const checks: ValidationChecks<RadiantAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class RadiantValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
