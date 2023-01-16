
# Javascript Progressbar tutorial

follow tutorial url 
https://webmobtuts.com/javascript/building-a-simple-interactive-segmented-progressbar-with-javascript/

website url:
https://webmobtuts.com


## using the progressbar
```
<script type="text/javascript" src="./progress.js"></script>
	<script>
		const steps = [
				{
					text: 'Checking environment',
					percent: 15
				},
				{
					text: 'Creating Files',
					percent: 25
				},
				{
					text: 'Building Database',
					percent: 50
				},
				{
					text: 'finalizing',
					percent: 10
				}
			];

		const myProgress = new ProgressBar(".progress-bar", steps);
		
		myProgress.start();  // start the progress process
		
	</script>
```
