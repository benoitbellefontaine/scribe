export default {
    "name": "SD",
    "type":"root",
    "children": [
        { 
            "name": "request",
            "type": "reason",
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
        {
            "name": "repair",
            "type": "reason",
            "children": [
                { "name": "Son of B" },
                { "name": "Daughter of B" }
            ]
        },
        { 
            "name": "anything else",
            "type": "reason",
            "children": [
                { "name": "Son of C" },
                { "name": "Daughter of C" }
            ]
        },
    ]
};