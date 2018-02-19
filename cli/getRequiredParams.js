module.exports = (argv) => {

    let questions = []

    // get the paramaters config for each action
    let paramConfig = require(argv.pathToAction + '/paramaters.json')
    
    // go through each of the required paramaters
    // to check whether they have been provided
    // if not, then add the question to be asked
    Object.keys(paramConfig).forEach(actionParamKey => {

        if (!argv[actionParamKey]){
            if (paramConfig[actionParamKey].required){
                // add the question
                questions.push(paramConfig[actionParamKey].question)
            }
        }
        
    })

    return Promise.resolve(questions)
}