import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '3c30f7ec473f45bca2cb37ec2d544e02'
                    }
                    'incident-manager-page': {
                        table: 'sys_ui_page'
                        id: '330941116d8046b0a610f73149d6ac49'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '6bbd703a0800477eb5286248e48b350a'
                    }
                    src_server_index_ts: {
                        table: 'sys_module'
                        id: '3eb240ed323b4fcfa9f2a247d3f88675'
                    }
                    'x_1860385_ticketda/main': {
                        table: 'sys_ux_lib_asset'
                        id: 'b2b837ec95714a7bb420f6d7ef0b990f'
                        deleted: true
                    }
                    'x_1860385_ticketda/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: 'a615b7cca8fc4445851c69899aacaafa'
                        deleted: true
                    }
                    'x_clone_ticketmgmt/main': {
                        table: 'sys_ux_lib_asset'
                        id: '77659c94c69a4a798b2ec35b49bc1d0f'
                    }
                    'x_clone_ticketmgmt/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: 'fed0aec339dc4be68edc8bd9b2d22b20'
                    }
                }
                composite: [
                    {
                        table: 'ua_table_licensing_config'
                        id: '043645e9f85a4b5094d98563b772ce6f'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '08e984d32edc46d5aaaa26aa11519355'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'short_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a0ff48488af4f0eab5ba0e31b5aa469'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0e8b9b060a6c466291fc4042224f0fc4'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'resolved_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0fb8f4548f8c4534b68ae97235f585fc'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '214f36a26a0242f3b87cbea71e308637'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '23c013d71afa4643a1777649f4ddb476'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                            value: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '242c1a2cb3ef451ba496165ec11cd3af'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                            value: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '243a5adfb7dc4dc38f5f018c12a6d653'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '2944e3e4d040425eb643de0ef46a6185'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '396cd681cb574e2e8b03f353ee86f799'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'resolved_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3982b57f2cbc4cbebb89db49946369c3'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'short_description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3999164c848e40d098cc7e32d0e56532'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                            value: '1'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '3e13957e47254e1f8f04b645ee023eb4'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '406c82ab923c45e9a4c01ee6bfe8f86c'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            value: 'resolved'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4a57c6a37c334fb6b389dfeacbf7ec30'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                            value: 'on_hold'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d34cbbe5ae04a808434fb120a2cd259'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'opened_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5113c17e814348d3b3c2a8f3ee276763'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '53623e52a89f478d91cce1bc41321c9a'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '59c45ff73a97497892cf5f42befd9c2f'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '5a5b0754b1244715bf54958e82c04bfe'
                        deleted: true
                        key: {
                            category: 'x_1860385_ticketda_incident'
                            prefix: 'INC'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5d3dc236cabb495cb5071f96f10a5404'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'resolved_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5e9973a1ee5446858bdc77ab5c538c2f'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'opened_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '604cc2ff59dc4d02baa149e92aff6386'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '63c6a2f4b10e4bf5978af8c04d906e0e'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                            value: 'resolved'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '668d85b82ca64ee997f9104d8985964f'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a1ea19538a149b3a9c46b32329b4d0a'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6a71bba8a29d4a87b30e40733a08997b'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '718a50b720364e659965e3c3e5c7ec81'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            value: 'new'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '75efb2ea9b344b3c8b6efc3172d130b8'
                        key: {
                            category: 'x_clone_ticketmgmt_incident'
                            prefix: 'INC'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '797cada57055443eb077c8e376f639a5'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                            value: '1'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7c51512af4754270bd10fa43cf14f120'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            value: 'on_hold'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7dea96f98df14a30901819fe332fdf93'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                            value: '4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7f6de5fccd2b478b886354b54dd4d710'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '84f4a3bab9da4fe59368c1ea8a531e6a'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                            value: 'closed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8620aada90244f2d87ff1ae4c98ca4ae'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '980c2b2ea52a46a68d47df94cda9464b'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'resolved_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a196ff6bc7434b91976b5a4eea7f84d5'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'opened_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a1fe055e586d414db392e4e70c36d9d8'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'opened_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a53662b7e73548f3bac49169dacc3481'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'ac4040fc15eb419c8396f3dc4f198e77'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aed2b93bfeda47b2be30decfae1dfc50'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b1219e3b3e1847f0b8940d50303f9a55'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                            value: '2'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'b5602e8a78d340489cf38a798bfe7182'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c1b64ee056ca4132908a6a8f745d6bfd'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c5ebdba4e1724daf90d11129b9dd354b'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cccdb0e790274064a9c3b16bc550a2b6'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd3e4ced09b444cd6b54ad606da8545a0'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4a37219d97f42ff84907a2e78fbc83f'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd7bb8f6c6d8c4109a2e87af82d176316'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'da1f033bd9a341dd8e1361f23663ba05'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'short_description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'da67ccaf9aea49748204c7127f6677a1'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                            value: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dac3148b869e4ea3a2ce8f4028fa7a24'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'status'
                            value: 'closed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e1d66103438747bdb3127c948672b809'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                            value: 'new'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'e22ddc6d0318496c820c2ddf3f560e15'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e497e13229614868b1191bf0f42098e8'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'short_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e59d2907f387426c9944eff2959672a1'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                            value: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e5f9ce64666b4fbdbe5b2027c0a269a0'
                        deleted: true
                        key: {
                            name: 'x_1860385_ticketda_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f37843a301944134b962641c02ade124'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'faf1fc34ed6c4a7094f594aebbc0e92c'
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'description'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
