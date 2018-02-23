const max_retries = 10;

const default_timeout = 1000;

const isSourceReady = (verifier, opts) => {
    opts = opts || {};

    const settings = {
        timeout: opts.timeout || default_timeout,
        maxRetries: opts.maxRetries || max_retries,
    };

    function checkAvailable(resolve, reject, count){
        if(count >= settings.maxRetries) {
            return reject('Did Not Establish a connection')
        }

        setTimeout( _ => {
            verifier()
            .then( _ => resolve())
            .catch(err => {
                checkAvailable(resolve, reject, count + 1)
            });
        }, settings.timeout);
    }

    return new Promise((resolve, reject) => {
        checkAvailable(resolve, reject, 0)
    });
};

module.exports = isSourceReady;