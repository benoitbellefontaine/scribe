const green8 = "#2f9e44";
const red8 = "#e03131";
const blue8 = "#1971c2";
const indigo8 = "#3b5bdb";
const orange8 = "#e8590c";
const yellow = "#ffd43b";

const info = "fas fa-info-circle fa-1x";
const link = "fas fa-link fa-1x";
const leaf = "fas fa-leaf fa-1x";
const mail = "fas fa-at fa-1x";
const paper = "fas fa-toilet-paper fa-1x"
const error = "fas fa-exclamation-triangle"
const fire = "fas fa-fire fa-1x";
const ambulance = "fas fa-ambulance fa-1x";
const medkit = "fas fa-medkit fa-1x";
const check = "fas fa-check-circle fa-1x";
const x = "fas fa-times-circle fa-1x";

let language = 'French';
let etext = 'hello';
let ftext = 'Bonjour';
let agent = 'agent name';
let email = 'benoit.bellefontaine';
let ticket = 'IM999999'
let client = 'Joe'
let subject = ticket + '- blackberry replacement';
let body = ((language === 'French') ? ftext + "%0D%0A%0D%0A" + etext : etext + "%0D%0A%0D%0A" + ftext) + "%0D%0A%0D%0A";
let signature = agent + "%0D%0AShared Services Canada | Service partagés Canada%0D%0AGovernment of Canada | Gouvernement du Canada%0D%0Assc.sdincidents-incidentscs.spc@canada.ca";
let greeting = ((language === 'French') ? "Bonjour " : "Hello ") + client + "%0D%0A%0D%0A";
let message = greeting + body + signature;


export default {
    "name": "start clicking",
    "type":"start", "color": green8,
    "children": [
        { "name": "quick send",
            "children": [
                { "name": "sent mobile device replacement package", "type":"email", "icon": mail, "color": blue8,
                    "mailFrom": agent,
                    "subject": " - mobile device replacement",
                    "etext": "Please access http://service.ssc.gc.ca/en/services/communicating/mobile-dev-phones/mobile-users, scroll down to the Ordering section and select Mobile Phones Order Form. \
                        %0D%0A%0D%0A The following fields and sections are MANDATORY: \
                        %0D%0A + First three fields : Date, Department and SD Ticket %23 \
                        %0D%0A + Section A : All fields \
                        %0D%0A + Section B : Must contain all the essential shipping information \
                        %0D%0A + Section C : All fields + Accept checkbox \
                        %0D%0A + Section E : Mandatory \
                        %0D%0A + Section F : All fields + Accept checkbox . Must be approved at DG level \
                        %0D%0A%0D%0A Incomplete, incorrectly filled or scanned forms will be rejected. \
                        %0D%0A%0D%0A Get the Device IMEI %23 by entering *%2306%23 on your phone's call screen.%0D%0A%0D%0A",
                    "ftext": "SVP accéder à http://service.ssc.gc.ca/fr/services/communication/appareils-mobiles-lignefixe/mobiles-utils, aller à la section Commande et choisir Formulaire de commande d’appareils mobiles. \
                        %0D%0A%0D%0ALes sections et champs à remplir sont au bas du document. SVP remplir :\
                        %0D%0A%0D%0A + Les trois premiers champs : date, ministère et no de billet \
                        %0D%0A + Section A : tous les champs \
                        %0D%0A + Section B : au minimum tous les champs de l'adresse postale \
                        %0D%0A + Section C : tous les champs + cocher la boîte Accepter \
                        %0D%0A + Section E : tous les champs \
                        %0D%0A + Section F : tous les champs + cocher la boîte Accepter \
                        %0D%0A%0D%0ALes formulaires incomplets seront rejetés. Pour envoyer, simplement répondre à ce courriel, joindre le formulaire et envoyer. \
                        %0D%0A%0D%0ARécupérer le Device IMEI %23 en entrant *%2306%23 sur l'écran de l'appareil.%0D%0A%0D%0A",
                },
            ] 
        },
        { "name": "warming up",
            "children": [
                { "name": "department", "type":"selection", "icon": info, "color": blue8, selection:['CSPS','INFC','PSPC','SSC'] },
                { "name": "client uses a tablet", "icon": info, "color": blue8 },
                { "name": "client uses a laptop computer", "icon": info, "color": blue8 },
                { "name": "client uses a desktop computer", "icon": info, "color": blue8 },
                { "name": "client uses win10", "icon": info, "color": blue8 },
                { "name": "client uses win7", "icon": info, "color": blue8 },
                { "name": "client is teleworking", "icon": info, "color": blue8 },
                { "name": "client restarted computer", "icon": info, "color": blue8 },
                { "name": "able to remote to client", "icon": info, "color": green8 },
                { "name": "not able to remote to client", "icon": info, "color": red8 },
            ]
        },
        { "name": "quick picks",
            "children": [
                { "name": "invalid username/password", "icon": leaf, "color": red8 },
                { "name": "invalid email username/password", "icon": leaf, "color": red8 },
                { "name": "etc", "icon": leaf, "color": red8 },
                { "name": "invalid username/password 2", "icon": leaf, "color": green8 },
                { "name": "invalid email username/password 2", "icon": leaf, "color": green8 },
                { "name": "etc 2", "icon": leaf, "color": green8 },
                { "name": "sent mobile device replacement package", "type":"email", "icon": mail, "color": blue8,
                    "mailto": agent,
                    "subject": " - mobile device replacement",
                    "etext": "Please access %0D%0A%0D%0Ahttp://service.ssc.gc.ca/en/services/communicating/mobile-dev-phones/mobile-users \
                        %0D%0A%0D%0AScroll down to the Ordering section (or click on Ordering under Topics on the left) \
                        and select Mobile Phones Order Form. \
                        Scroll down to the bottom of the form and start filling. The mandatory sections and fields are:\
                        %0D%0A%09 First 3 fields : Date of Request, Department and SD Ticket #. Mandatory sections are A, B, C, E and F. \
                        %0D%0A Section A : All fields. \
                        %0D%0A Section B : Must contain all the essential shipping information. \
                        %0D%0A Section C : All fields + the Accept checkbox. \
                        %0D%0A Section E : Mandatory \
                        %0D%0A Section F : All fields + the Accept checkbox. \
                        %0D%0A%0D%0AForms with invalid information, missing fields and sections will be rejected and will cause processing and delivery delays. \
                        %0D%0A%0D%0AScanned forms will be rejected.The form must be electronically filled, attached to an email and returned to SD Incidents \
                        %0D%0A%0D%0ANote: Scanned documents will be rejected. \
                        %0D%0A%0D%0AGetting the Device IMEI #: (1) enter  on your phone's call screen OR look behind the battery for a sticker with the number on it OR look in the phone shipping box",
                    "ftext": "Ouvrir le formulaire PDF %0D%0A%0D%0Ahttp://service.ssc.gc.ca/en/services/communicating/mobile-dev-phones/mobile-users \
                        %0D%0A%0D%0AScroll down to the bottom of the form and start filling.\
                        %0D%0A%0D%0A First 3 fields : Date of Request, Department and SD Ticket #. \
                        %0D%0A Section A : All fields. \
                        %0D%0A Section B : Must contain complete shipping information. \
                        %0D%0A Section C : All fields + Accept checkbox. \
                        %0D%0A Section E : Mandatory \
                        %0D%0A Section F : All fields + Accept checkbox. \
                        %0D%0A%0D%0AInvalid, missing information will cause form to be rejected. Best: Reply to this email, attach form and send. \
                        %0D%0A%0D%0AGetting the Device IMEI #: enter *#06# on your phone's call screen",
                },
            ]
        },
        { "name": "request issue",
            "type": "reason",
            "color": red8,
            "children": [
                { 
                    "name": "refer to RM of",
                    "type": "process",
                    "children": [
                        { 
                            "name": "CSPS",
                            "children": [
                                { 
                                    "name": "refer to RM of",
                                    "type": "process",
                                    "children": [
                                        { "name": "CSPS" },
                                        { "name": "INFC" },
                                        { "name": "PSPC" },
                                        { "name": "SSC" }
                                    ]
                                },
                                { "name": "L3: A2" }
                            ]
                        },
                        { "name": "INFC" },
                        { "name": "PSPC" },
                        { "name": "SSC" }
                    ]
                },
                { "name": "L3: A2" }
            ]
        },
        { "name": "support issue",
            "children": [
                { "name": "login issue",
                    "children": [
                        { "name": "cannot login to computer", "icon": leaf, "color": red8,
                            "children": [
                                { "name": "invalid password", "icon": leaf, "color": blue8,
                                    "children": [ 
                                        { "name":" / reset password", "icon": leaf, "color": green8 },
                                        { "name":" / client able to login", "icon": leaf, "color": green8 } 
                                    ]
                                },
                                { "name": "reset password", "icon": leaf, "color": green8},
                            ]
                        },
                        { "name": "cannot login to network" },
                        { "name": "cannot login to PSPM" },
                        { "name": "cannot login to PeopleSoft" },
                        { "name": "cannot login to CWA" },
                        { "name": "cannot login to WebSuite" },
                    ]
                },
                { "name": "browsing issue",
                    "children": [
                        { "name": "browsing issue 1" },
                        { "name": "browsing issue 2" },
                        { "name": "browsing issue 3" },
                        { "name": "browsing issue 4" },
                        { "name": "browsing issue 5" },
                    ] 
                },
                { "name": "email issue",
                    "children": [
                        { "name":"testing email account with webmail",
                            "children": [
                                { "name":"redirected @canada.ca email user to webmail",  "icon": leaf, "color": green8 },
                                { "name":"webmail access (@canada.ca) and test ", "icon": link, "color": orange8,
                                    "linkto":"https://email-courriel.canada.ca"
                                },
                                { "name":"redirected PSPC client to webmail", "icon": leaf, "color": green8 },
                                { "name":"webmail access (@tpsgc-pwgsc.gc.ca) and test ", "icon": link, "color": orange8,
                                    "linkto":"https://mail.tpsgc-pwgsc.gc.ca"
                                },
                                { "name":"webmail test -> client able to access webmail mailbox", "icon": leaf, "color": green8 },
                                { "name":"webmail test inconclusive", "icon": leaf, "color": green8,
                                    "children": [
                                        { "name": "unlocked account and/or reset account password",
                                            "children": [
                                                { "name": "webmail test still inconclusive", "type":"leaf", "icon": leaf, "color": green8},
                                                { "name": "escalating email account issue to ncracct", "type":"leaf", "icon": leaf, "color": green8},
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        { "name": "email account issue",
                            "children": [
                                { "name": "client started work less than 2 days ago",
                                    "children": [
                                        { "name": "email account not fully functional", "type":"leaf", "icon": leaf, "color": green8},
                                        { "name": "told client to wait at least 24 hours", "type":"leaf", "icon": leaf, "color": green8},
                                        { "name": "call back service desk after 48 hours", "type":"leaf", "icon": leaf, "color": green8},
                                    ]
                                },
                                { 
                                    "name": "email account was created but is not fully functional",
                                    "children": [
                                        { "name": "told client wait at least 24 hours", "type":"leaf", "icon": leaf, "color": green8},
                                    ]
                                },
                                { "name": "can receive - cannot send",
                                    "children": [
                                        { "name": "tested with webmail (@canada.ca)", "type":"leaf", "icon": leaf, "color": green8},
                                        { "name": "tested with webmail (@tpsgc-pwgsc.gc.ca)", "type":"leaf", "icon": leaf, "color": green8},
                                        { "name": "check OK with ", "type":"leaf", "icon": leaf, "color": green8},
                                        { "name": "told client wait at least 24 hours", "type":"leaf", "icon": leaf, "color": green8},
                                        { "name": "told client wait at least 24 hours", "type":"leaf", "icon": leaf, "color": green8},
                                    ]
                                },
                                { "name": "email: can send - cannot receive", "type":"leaf", "icon": leaf, "color": green8},
                                { "name": "mailbox is full & quota size is normal",
                                    "children": [
                                        { "name": "told client to client (hint: sort by size and delete large items", "type":"leaf", "icon": leaf, "color": green8},
                                    ]
                                },
                                { "name": "mailbox is full & quota size = 0",
                                    "children": [
                                        { "name": "creating and escalated ticket to ncracct", "type":"leaf", "icon": leaf, "color": green8},
                                    ]
                                },
                                { "name": "email issue 3" },
                                { "name": "email issue 4" },
                                { "name": "email issue 5" },
                            ] 
                        },
                        { "name": "generic email account issue",
                            "children": [
                                { "name": "generic email account issue 2", "type":"leaf", "icon": leaf, "color": green8},
                                { "name": "generic email account issue 2", "type":"leaf", "icon": leaf, "color": green8},
                            ]
                        },
                        { "name": "email issue 3" },
                        { "name": "email issue 4" },
                        { "name": "email issue 5" },
                    ] 
                },
                { "name": "vpn issue",
                    "children": [
                        { "name":"educating rita...", "icon": info, "color": blue8, "title":"VPN",
                            "autoinfo":"VPN users require 3 components to connect from outside to the GC network: (1) an internet connection \
                            (2) a valid myKey,  and (3) a valid account to their departemental SRA gateway."
                        },
                        { "name":"link to confluence (cisco anyconnect)", "icon": link, "color": orange8,
                            "linkto":"https://confluence.ssc-spc.gc.ca/display/SEWS/Cisco+AnyConnect"
                        },
                        { "name": "vpn connection prerequisites",
                            "children": [
                                {   "name": "client confirmed connection to internet", "type":"leaf", "icon": leaf, "color": green8 },
                                {   "name": "ensured client is connected to mykey", "type":"leaf", "icon": leaf, "color": green8 },
                                {   "name": "asked client to logoff/login to mykey", "type":"leaf", "icon": leaf, "color": green8 },
                                {   "name": "client confirmed vpn account validity", "type":"leaf", "icon": leaf, "color": green8 },
                            ]
                        },
                        { "name": "interrogate sra about client vpn account validity",
                            "children": [
                                {   "name": "sent email to gcsra and waiting for response", "type":"email", "icon": mail, "color": blue8,
                                    "to":"NCRGCSRA.RCNGCSRA@ssc-spc.gc.ca",
                                    "subject": "vpn account",
                                    "etext": "Hello, %0D%0A%0D%0APlease verify that%0D%0A%0D%0A",
                                    "etext1": "%0D%0A%0D%0Ahave a valid vpn account%0D%0A%0D%0AThank you,"
                                },
                                {   "name": "created & escalated ticket to npssras", "type":"ticket", "icon": paper, "color": indigo8,
                                },
                            ]
                        },
                        { "name": "client is connected to a wireless network",
                            "children": [
                                { "name":"but cannot connect through the vpn", "icon":leaf, "color": green8 },
                                { "name":"asked client to reboot device", "icon":leaf, "color": green8 },
                                { "name":"still cannot connect", "icon":leaf, "color": green8 },
                                { "name":"asked client to logoff and login to mykey", "icon":leaf, "color": green8 },
                                { "name":"told client to go back to office and reinstall cisco anytime client", "icon":leaf, "color": green8 },
                                { "name":"created ticket and escalated to NATDSUPP", "icon":leaf, "color": green8 },
                            ]
                        },
                        { "name": "connecting to a network with a gateway firewall (e.g hotel)",
                            "children": [
                                { "name":"asked client to login to mykey", "icon":leaf, "color": green8 },
                                { "name":"ensured client has a valid vpn account", "icon":leaf, "color": green8 },
                                { "name":"ensured client is connected to a wireless network", "icon":leaf, "color": green8 },
                                { "name":"asked client to open the dos prompt (cmd) and", "icon":leaf, "color": green8 },
                                { "name":"execute: netsh wlan show profiles >c:\intel\wifi_issue.txt", "icon":leaf, "color": green8 },
                                { "name":"had the client look at the c:\intel\wifi_issue.txt and", "icon":leaf, "color": green8 },
                                { "name":"take note of the wifi profile name from the hotel and", "icon":leaf, "color": green8 },
                                { "name":"execute : netsh wlan delete profile <profile name>", "icon":leaf, "color": green8 },
                                { "name":"had client cancel cisco anyconnect if it attempts to load", "icon":leaf, "color": green8 },
                                { "name":"asked client to access hotel website and accepts Terms of Use", "icon":leaf, "color": green8 },
                                { "name":"asked client to reload cisco anyconnect and connect", "icon":leaf, "color": green8 },
                            ]
                        },
                        { "name": "client getting a specific error message", "icon":error, "color":"#f08c00",
                            "children": [
                                { "name":"error 'certificate validation failure'", "icon":leaf, "color":"#f08c00",
                                    "children": [
                                        { "name":"client mykey may not exist or is invalid", "icon":leaf, "color": "#f08c00" },
                                        { "name":"client to return to office and download new certificate", "icon":leaf, "color":"#f08c00" },
                                    ]
                                },
                                { "name":"error: 'always-on failure'", "icon":leaf, "color":"#f08c00",
                                    "children": [
                                        { "name":"this feature allows connectivity only if client is vpn-connected", "icon":leaf, "color": "#f08c00" },
                                        { "name":"client may not have an account -> interrogate sra", "icon":leaf, "color": "#f08c00" }
                                    ]
                                },
                                { "name":"error: 'always-on failure'", "icon":leaf, "color":"#f08c00",
                                    "children": [
                                        { "name":"client may not have an account -> interrogate sra", "icon":leaf, "color": "#f08c00" }
                                    ]
                                },
                            ]
                        },
                    ] 
                },
                { "name": "mykey issue",
                    "children": [               
                        { "name": "client can't login to mykey" },
                        { "name": "client can't find mykey" },
                        { "name": "client gets a certificate error" },
                        { "name": "client can't remember mykey password" },
                        { "name": "client can't see mykey selected in IE" },
                        { "name": "client can't open or send encrypted emails" },
                        { "name": "PRI status",
                            "children": [
                                { "name": "Client has PRI" },
                                { "name": "Client has no PRI" }
                            ]
                        },
                        { "name": "Client transferred from another department",
                            "children": [
                                { "name": "Client has transferred from another department" },
                                { "name": "Client has not transferred from another department" },
                            ]
                        },
                        { "name": "Client mykey recovered",
                            "children": [
                                { "name": "Client has recovered her mykey" },
                                { "name": "Client has not recovered her mykey" },
                            ]
                        },
                        { "name": "Client referral options with PRI",
                            "children": [
                                { "name": "Client can recover his mykey through ORCA" },
                                { "name": "Client can contact an LRA for assistance" }
                            ]
                        },  
                        { "name": "Client referral options without PRI",
                            "children": [
                                { "name": "Client needs to contact an LRA for assistance" }
                            ]
                        },
                        { "name": "Client mykey transfer support options",
                            "children": [
                                { "name": "Client needs to contact an LRA for assistance for mykey transfer" }
                            ]
                        },
                        { "name": "Client mykey recovery",
                            "children": [
                                { "name": "Client can recover his mykey on the ORCA site" },        
                                { "name": "Client needs to contact an LRA for assistance for mykey recovery" }
                            ]
                        },
                        { "name": "Forgot mykey password support with PRI",
                            "children": [
                                { "name": "Client needs to recover his password from ORCA " },
                                { "name": "Client needs to contact an LRA for assistance" }
                            ]
                        },
                        { "name": "Can't see mykey in IE support",
                            "children": [
                                { "name": "RC to users computer" },     
                                { "name": "Clear the Java cache" },
                                { "name": "Clear the IE cache" },
                                { "name": "Enable the Java add ons in IE" }
                            ]
                        },
                        { "name": "Can't see/send encrypted emails in outlook",
                            "children": [
                                { "name": "RC to users computer" },
                                { "name": "Make sure user in logged into mykey" },
                                { "name": "Enable the entrust add ins for Outlook" }
                            ]
                        },              
                    ]
                },
                { "name": "computer issue",
                    "children": [
                        { "name": "client is using a tablet device" },
                        { "name": "client is using a laptop device" },
                        { "name": "client is using a desktop device" },
                        { "name": "device is defective" },
                        { "name": "device will not reboot" },
                        { "name": "device will not shut down" },
                        { "name": "device will take a long time to reboot" },
                        { "name": "device will take a long time to shut down" },
                        { "name": "device is hot to the touch" },
                        { "name": "device battery is not keeping its charge" },
                    ]
                },
                { "name": "mobile device issue",
                    "children": [
                        { "name":"link to confluence (cisco anyconnect)", "icon": link, "color": orange8,
                            "linkto":"https://confluence.ssc-spc.gc.ca/display/SEWS/Cellular+Devices"
                        },
                        { "name": "cellular device issue",
                          "children": [
                            { "name": "mobile network activation issue",
                                children: [
                                    { "name": "SIM card not activated" },
                                    { "name": "referred user to Bell Activation Hotline at 1-866-238-0988" },
                                    { "name": "etc..." },
                                ]
                            },
                            { "name": "Break/Replace Smartphone Device Process",
                                "link": "https://confluence.ssc-spc.gc.ca/pages/viewpage.action?pageId=83401500",
                                children: [
                                    { "name": "user factory reset phone" },
                                    { "name": "user still having a problem with the phone",
                                        children: [
                                            { "name": "referred user to Bell Activation Hotline at 1-866-238-0988" },
                                        ]                                            
                                    },
                                    { "name": "sent form + instructions + ticket to client" },
                                    { "name": "closing issue" },
                                ]
                            },
                          ]
                        },
                        { "name": "android knox issue" },
                        { "name": "blackberry issue" },
                    ] 
                },
                { "name": "phone issue",
                    "children": [
                        { "name": "cellular", 
                            "children": [
                                { "name": "cellular",
                                    "children": [
                                        { "name": "cellular" },
                                        { "name": "android knox" },
                                        { "name": "blackberry" },
                                    ] 
                                },
                                { "name": "android knox" },
                                { "name": "blackberry" },
                            ]
                        },
                        { "name": "target device: android knox" },
                        { "name": "target device: blackberry" },
                    ] 
                },
                { "name": "java issue",
                    "children": [
                        { "name": "java issue 1",
                            "children": [
                                { "name": "java issue 1.1" },
                                { "name": "java issue 1.2" },
                            ] 
                        },
                        { "name": "java issue 2" },
                    ] 
                },
                { "name": "wifi issue",
                    "children": [
                        { "name": "for improper NATDSUPP escalation see IM263922"}
                    ]
                }
            ]
        },
        { "name": "choppah issue",
            "type": "reason",
            "children": [
                { "name": "Get down!" },
                { "name": "Get to the choppah!" }
            ]
        },
        { "name" : "outage", 
            "children" : [
                { "name":"link to confluence (cisco anyconnect)", "icon": link, "color": orange8,
                    "linkto":"https://confluence.ssc-spc.gc.ca/display/SEWS/Cisco+AnyConnect"
                },
            ]
        },
        { "name": "INFC issue",
            "type": "reason",
            "children": [
                { "name": "JIRA issue",
                    "children": [
                        { "name" : "short description: INFC-<REGION>-SERVER-<OS>" },
                        { "name" : "group: ETSMRSUP" },
                        { "name" : "application: SSCJIRA" }
                    ]
                }
            ]
        },
    ]
}