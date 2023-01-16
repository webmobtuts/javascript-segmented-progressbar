class ProgressBar {

			selector = ".progress-bar";				// progress bar selector
			steps = [];                     		// expected array of step objects

			#totalCompletedThreshold = 0;    		// private property 
			#currStepCompleted = 0;
			#currStepIndex = 0;
			#animationSpeed = 1000;
			#showLog = true;

			constructor(selector, steps, showLog = true) {
				this.selector = selector;
				this.steps = steps;
				this.#showLog = showLog;
			}

			get progressDom() {
				return document.querySelector(this.selector);
			}

			get progressCompleteDom() {
				return document.querySelector('.progress-complete');
			}


			generateStepsDom() {

				steps.forEach(step => {    // for each step create a div element inside the main progress container
					const createdStep = document.createElement("div");

					step.class = 'progress-step';        // assign css class name

					createdStep.setAttribute('class', step.class);
					
					const randomColor = Math.floor(Math.random()*16777215).toString(16);

					step.style = {
						'background-color': `#${randomColor}`
					};

					createdStep.setAttribute('style', this.mapStyleObjToStyleStr(step.style));

					this.progressDom.appendChild(createdStep);

					step.domNode = createdStep;
				});
			}


			mapStyleObjToStyleStr(styleObj) {      // convert style object to style string
				const styleArr = [];

				Object.entries(styleObj).forEach(([key, value]) => {
					styleArr.push(`${key}:${value}`);
				});

				return styleArr.length ? styleArr.join(';'): '';
			}

			
			setStepWidth(index, width) {     // set the step dom node width

				const stepSelector = document.getElementsByClassName("progress-step")[index];

				if(stepSelector) {
					const stepStyle = {...this.steps[index].style};

					stepStyle.width = `${width}%`;
					
					this.steps[index].style = stepStyle;

					stepSelector.style = this.mapStyleObjToStyleStr(stepStyle);

					stepSelector.innerText = `${this.steps[index].text} (${stepStyle.width})`;

					this.steps[index].domNode = stepSelector;
				}
			}

			createProgressCompleteNode() {
				const node = document.createElement("div");

				node.setAttribute('class', 'progress-complete');

				this.progressDom.appendChild(node);
			}

			markProgressAsComplete() {
				const progressComplete = this.progressCompleteDom;

				progressComplete.innerText = 'Completed 100%';
				progressComplete.style.display = "block";

				this.steps.forEach(step => {
					if(step.domNode) {
						step.domNode.style = this.mapStyleObjToStyleStr({...step.domNode.style, display: 'none'});
					}
				});
			}

			start() {
				this.generateStepsDom();

				let interval = setInterval(() => {
				
					if(this.#totalCompletedThreshold >= 100) {
						
						this.createProgressCompleteNode();

						this.markProgressAsComplete();

						clearInterval(interval);
					} else {
						if(this.steps[this.#currStepIndex] && this.steps[this.#currStepIndex].percent === this.#currStepCompleted) {

							this.setStepWidth(this.#currStepIndex, this.steps[this.#currStepIndex].percent);

							++this.#currStepIndex;
							this.#currStepCompleted = 0;	
						} else {
							
							++this.#currStepCompleted;
							
							this.setStepWidth(this.#currStepIndex, this.#currStepCompleted);
							
							++this.#totalCompletedThreshold;
						}
					}

					if(this.#showLog) {
						console.info(`current step index: ${this.#currStepIndex} - current step completed ${this.#currStepCompleted} - total completed ${this.#totalCompletedThreshold}`);
					}

				}, this.#animationSpeed);
			}

}