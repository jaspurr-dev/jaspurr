import {fromTemplate, type Template} from '@/core/template';
import {techPm} from '@/core/templates/tech-pm';
import {expertDesigner} from './expert-designer';

export const TEMPLATES = {
    'tech-pm-type-a': techPm,
    'expert-designer': expertDesigner,
} satisfies Record<string, Template>;

export const defaultComposition = fromTemplate(TEMPLATES['tech-pm-type-a']);

export type TemplateId = keyof typeof TEMPLATES;
