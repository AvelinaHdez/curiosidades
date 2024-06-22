const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {  
    en: {
        translation: {
            WELCOME_MESSAGE: 'Welcome to the enchanting world of Rose Facts! Simply say, "I want to know something interesting about roses." What would you love to explore today?',
            HELLO_MESSAGE: 'Hello there! Step into the beautiful realm of Rose Facts.',
            HELP_MESSAGE: 'You can ask me to share a lovely fact about roses by saying, "Share a rose fact with me." How may I delight you today?',
            GOODBYE_MESSAGE: 'Farewell! Return soon for more delightful rose facts.',
            REFLECTOR_MESSAGE: 'You have just activated %s.',
            FALLBACK_MESSAGE: 'I\'m sorry, I don\'t have information on that. Please try again.',
            ERROR_MESSAGE: 'I\'m sorry, I encountered an issue while processing your request. Please try again.',
            CURIOSITY_MESSAGE: 'Here\'s a delightful rose fact: %s. Would you like to hear another enchanting fact?',
            REPROMPT_MESSAGE: 'Would you love to hear another enchanting rose fact?',
            CURIOSITIES: [
                'Roses have been cherished as symbols of love, beauty, and passion throughout the ages.',
                'There are over 300 enchanting species and countless varieties of roses.',
                'The oldest known living rose is over 1,000 years old, flourishing on the walls of Hildesheim Cathedral in Germany.',
                'Roses can have incredibly long lives. A rose bush in Tombstone, Arizona, has been thriving for over 130 years.',
                'The largest rose ever cultivated was a stunning pink beauty, spanning approximately 33 inches in diameter.',
                'Rose hips, the fruit of the rose plant, are rich in vitamin C and are often used to create delightful jams, jellies, and teas.',
                'The rose is the beloved national flower of the United States, the United Kingdom, and the Maldives.',
                'Although black roses are legendary, they do not exist in nature. The darkest roses are deep red or purple, captivating the imagination.',
                'For centuries, roses have graced perfumes with their exquisite fragrance. Rose oil, or attar of roses, is a treasured component in many scents.',
                'Roses have been adored and cultivated for their captivating beauty and aroma for over 5,000 years.'
            ]
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: '¡Bienvenido al encantador mundo de las Curiosidades sobre Rosas! Simplemente di, "Quiero saber una curiosidad de las rosas". ¿Qué te gustaría explorar hoy?',
            HELLO_MESSAGE: '¡Hola! Adéntrate en el hermoso reino de las Curiosidades sobre Rosas.',
            HELP_MESSAGE: 'Puedes pedirme que te comparta una encantadora curiosidad sobre rosas diciendo, "Compárteme una curiosidad sobre rosas". ¿Cómo puedo deleitarte hoy?',
            GOODBYE_MESSAGE: '¡Hasta pronto! Vuelve pronto para más encantadoras curiosidades sobre rosas.',
            REFLECTOR_MESSAGE: 'Acabas de activar %s.',
            FALLBACK_MESSAGE: 'Lo siento, no tengo información sobre eso. Por favor, intenta de nuevo.',
            ERROR_MESSAGE: 'Lo siento, encontré un problema al procesar tu solicitud. Por favor, intenta de nuevo.',
            CURIOSITY_MESSAGE: 'Aquí tienes una encantadora curiosidad sobre rosas: %s. ¿Te gustaría escuchar otra fascinante curiosidad?',
            REPROMPT_MESSAGE: '¿Te gustaría escuchar otra fascinante curiosidad sobre rosas?',
            CURIOSITIES: [
                'Las rosas han sido apreciadas como símbolos de amor, belleza y pasión a lo largo de los tiempos.',
                'Existen más de 300 especies encantadoras y una infinidad de variedades de rosas.',
                'La rosa viva más antigua conocida tiene más de 1,000 años, floreciendo en los muros de la Catedral de Hildesheim en Alemania.',
                'Las rosas pueden tener vidas increíblemente largas. Un rosal en Tombstone, Arizona, ha prosperado durante más de 130 años.',
                'La rosa más grande jamás cultivada fue una impresionante belleza rosa, con un diámetro de aproximadamente 33 pulgadas.',
                'Los escaramujos, el fruto de la planta de rosa, son ricos en vitamina C y a menudo se utilizan para crear deliciosas mermeladas, jaleas y tés.',
                'La rosa es la amada flor nacional de Estados Unidos, el Reino Unido y las Maldivas.',
                'Aunque las rosas negras son legendarias, no existen en la naturaleza. Las rosas más oscuras son de un profundo rojo o púrpura, cautivando la imaginación.',
                'Durante siglos, las rosas han adornado los perfumes con su exquisita fragancia. El aceite de rosa, o attar de rosas, es un componente preciado en muchos aromas.',
                'Las rosas han sido adoradas y cultivadas por su cautivadora belleza y aroma durante más de 5,000 años.'
            ]
        }
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CuriosityIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CuriosityIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const curiosities = requestAttributes.t('CURIOSITIES');
        const randomIndex = Math.floor(Math.random() * curiosities.length);
        const curiosity = curiosities[randomIndex];
        const speakOutput = requestAttributes.t('CURIOSITY_MESSAGE', curiosity);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(requestAttributes.t('REPROMPT_MESSAGE'))
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = requestAttributes.t('REFLECTOR_MESSAGE', intentName);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en',
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        }
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        CuriosityIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor)
    .withCustomUserAgent('sample/rose-facts/v1.0')
    .lambda();
