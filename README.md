# redux-live-data-performance-test
This repo was created to provide a direct comparison to the [MobX State Tree equivalent](https://github.com/sorenhoyer/mobx-state-tree-live-data-performance-test), because MST showed a very high memory and CPU usage. The idea behind these repos is:
> An attempt to lower CPU and RAM usage as much as possible with the current data structure while maintaining an updated min / max value > > for each insertion. After 2000 seconds (insertions) the chart will start rolling since the first item will be removed when the limit is > reached.

**Development** mode:
- clone
- npm install
- npm start to run the app

**Production** mode:

- clone
- npm install
- npm run build
- npm install -g serve
- serve -s build

Testing should be done with a production build.

## Test results seen so far (2018-02-15) ##

**Redux (this):**

- 0: 2% 370MB
- 500: 0% 350MB
- 1000: 0.3% 354MB
- 1500: 0 % 360MB
- 1999: 0% 373MB
- 2000+: 0% 342-356MB (356 after 1 hour of running)

**MobX State Tree equivalent (https://github.com/sorenhoyer/mobx-state-tree-live-data-performance-test):**

- 0: 4% 350MB
- 500: 7% 420MB
- 1000: 12.5% 570MB
- 1500: 18% 750MB
- 1999: 25% 1250MB 

**Both tests were performed with:**

- the chart commented out
- 2000 datapoints
- 100ms intervals
- chrome, without other tabs / windows open (no dev tools either)
- dev tools commented out in code (is done by default)

CPU & Memory was monitored at 0, 500, 1000 etc from Windows 10 Task manager. The Redux test were performed in dev mode, while the MST one was done with a production build - not that it should matter much.

This could indicate a memory leak in MST. This is being investigated.
