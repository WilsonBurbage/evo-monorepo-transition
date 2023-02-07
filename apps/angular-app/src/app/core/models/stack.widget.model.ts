import { StackWidgetConfig } from './stack-widget-config.model';
import { StackWidgetReference } from './stack-widget-reference.model';

export interface StackWidget {
  id: string;
  stackWidgetReference: StackWidgetReference;
  config?: StackWidgetConfig;
}
