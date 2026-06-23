import {fromTemplate, type Template} from '@/core/template';
import {techPm} from '@/core/templates/tech-pm';

export const TEMPLATES = {
    'tech-pm-type-a': techPm,
} satisfies Record<string, Template>;

export const defaultComposition = fromTemplate(TEMPLATES['tech-pm-type-a']);

export type TemplateId = keyof typeof TEMPLATES;
