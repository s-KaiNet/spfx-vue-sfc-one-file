import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { ITodoWebPartProps } from './ITodoWebPartProps';
export default class TodoWebPart extends BaseClientSideWebPart<ITodoWebPartProps> {
    data: ITodoWebPartProps;
    render(): void;
    onBeforeSerialize(): any;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
