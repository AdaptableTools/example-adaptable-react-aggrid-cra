import * as React from 'react';
import { useMemo } from 'react';
import { LicenseManager, GridOptions, themeQuartz } from 'ag-grid-enterprise';
import {
  Adaptable,
  AdaptableApi,
  AdaptableOptions
} from '@adaptabletools/adaptable-react-aggrid';
import { columnDefs, defaultColDef } from './columnDefs';
import { WebFramework, rowData } from './rowData';
import { agGridModules } from './agGridModules';

LicenseManager.setLicenseKey(process.env.REACT_APP_AG_GRID_LICENSE_KEY as string);

const CONFIG_REVISION = 1;


export const AdaptableAgGrid = () => {
  const gridOptions = useMemo<GridOptions<WebFramework>>(
    () => ({
      defaultColDef,
      columnDefs,
      rowData,
      theme: themeQuartz,
      sideBar: true,
      statusBar: {
        statusPanels: [
          { statusPanel: 'agTotalRowCountComponent', align: 'left' },
          { statusPanel: 'agFilteredRowCountComponent' },
          {
            key: 'Center Panel',
            statusPanel: 'AdaptableStatusPanel',
            align: 'center',
          },
        ],
      },

      suppressMenuHide: true,
      cellSelection: true,
      enableCharts: true,
    }),
    []
  );
  const adaptableOptions = useMemo<AdaptableOptions<WebFramework>>(
    () => ({
      licenseKey: process.env.REACT_APP_ADAPTABLE_LICENSE_KEY as string,
      primaryKey: 'id',
      userName: 'Test User',
      adaptableId: 'Adaptable React with CRA(CO)',
      adaptableStateKey: 'adaptable_react_demo_with_craco',
      initialState: {
        Dashboard: {
          Revision: CONFIG_REVISION,
          Tabs: [
            {
              Name: 'Welcome',
              Toolbars: ['Layout'],
            },
          ],
        },
        Layout: {
          Revision: CONFIG_REVISION,
          CurrentLayout: 'Default',
          Layouts: [
            {
              Name: 'Default',
              TableColumns: [
                'name',
                'language',
                'github_stars',
                'license',
                'week_issue_change',
                'created_at',
                'has_wiki',
                'updated_at',
                'pushed_at',
                'github_watchers',
                'description',
                'open_issues_count',
                'closed_issues_count',
                'open_pr_count',
                'closed_pr_count',
              ],
            },
            {
              Name: 'Small Layout',
              TableColumns: [
                'name',
                'language',
                'week_issue_change',
                'created_at',
                'github_stars',
                'license',
              ],
            }
          ],
        },
        StatusBar: {
          Revision: CONFIG_REVISION,
          StatusBars: [
            {
              Key: 'Center Panel',
              StatusBarPanels: ['Theme'],
            },
          ],
        },
      },
    }),
    []
  );

  const adaptableApiRef = React.useRef<AdaptableApi>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

      <Adaptable.Provider
        gridOptions={gridOptions}
        adaptableOptions={adaptableOptions}
        modules={[...agGridModules]}
        onAdaptableReady={({ adaptableApi }) => {
          // save a reference to adaptable api
          adaptableApiRef.current = adaptableApi;
        }}
      >
        <div style={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>

          <Adaptable.UI style={{ flex: 'none' }} />
          <Adaptable.AgGridReact />
        </div>
      </Adaptable.Provider>
    </div>
  );
};
