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
                    'x_1860385_external/main': {
                        table: 'sys_ux_lib_asset'
                        id: '4824ca590fe04f5fa9add2ab511581c3'
                    }
                    'x_1860385_external/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: '65af2f3f2b284f93b6c2ce6348735e79'
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
                        deleted: true
                    }
                    'x_clone_ticketmgmt/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: 'fed0aec339dc4be68edc8bd9b2d22b20'
                        deleted: true
                    }
                    'x_extticket_v2/main': {
                        table: 'sys_ux_lib_asset'
                        id: '4aeabf8858114eb9b43c2adad562360a'
                        deleted: true
                    }
                    'x_extticket_v2/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: 'd6dfae85452d4dab9e83e5761d2812b9'
                        deleted: true
                    }
                    'x_ticket_mgmt_new/main': {
                        table: 'sys_ux_lib_asset'
                        id: '08e552e5e2f04b34a3b9a516da9cf537'
                        deleted: true
                    }
                    'x_ticket_mgmt_new/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: '726dc34d003d49b99291d0c5c94e3174'
                        deleted: true
                    }
                }
                composite: [
                    {
                        table: 'ua_table_licensing_config'
                        id: '02d61a2589ac4020bff4bf1a169b6dde'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '043645e9f85a4b5094d98563b772ce6f'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '096641531b524f34a060fd62882f5564'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a0ff48488af4f0eab5ba0e31b5aa469'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0e77140d24bb4f0ea72b261dec76f7a8'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'resolved_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0e8b9b060a6c466291fc4042224f0fc4'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '101d5c5ffb3c411aa0b8ec0cabb2abe7'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '10e3fcb405fe4e2bb871013283bc7f33'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'short_description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1657fbeeb789448da7aa2e7c5e3f0ccf'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'opened_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1685ff948b454b54b0e44127a585e12d'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'short_description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '18493fd75b2749baa2d962783a17d2aa'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'resolved_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '1a748836317f4317a61db4e2ca29baf6'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1b056babecdd4a9b9d15ec10332822b8'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1bcc27a02f7449ceb936bef4bf157f88'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'opened_at'
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
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '243a87aa040f446ea47b5dd36b948f69'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '26279ad484e14943ae9bc757dd12532f'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2701aff5acc54a55ab1550e723c79170'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'status'
                            value: 'closed'
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
                        table: 'sys_dictionary'
                        id: '2cbc2dd2b8214ccfbda1d28209c3be1c'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2ddddd7549534a0191b898477378e937'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '30a0997d58ce425b9de694ce005aa76d'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '32a18addf2b3435bb5db91f0b5803caa'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '350069b7736a40c19a463e46964d219c'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'priority'
                            value: '4'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '351fcbebcbcf4a32bd12124bc93abfb3'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'priority'
                            value: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '370b5750c73a4b8c837ff24324056b86'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '37c1ac3cb12544f2acaab573249ad0d6'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'priority'
                            value: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '37fcfa6f031844f98b9f265755555da4'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '396cd681cb574e2e8b03f353ee86f799'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'resolved_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3982b57f2cbc4cbebb89db49946369c3'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '3e8c18458dfa444eb517f9241cf7f290'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'resolved_at'
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
                        table: 'sys_dictionary'
                        id: '40c1df34a8a641d9b155009b7a29639a'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '43eb2470eb7b419193b43e19852fee8c'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '45a7fc60e1aa4ff0bf589d9c45325499'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '48a40a08c0864111850dfcad58f06cf2'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4a57c6a37c334fb6b389dfeacbf7ec30'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                            value: 'on_hold'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d34cbbe5ae04a808434fb120a2cd259'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '5239bd96bb4e454db8a55c3ed3259f3f'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '53623e52a89f478d91cce1bc41321c9a'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5416eb923f234ff6bafd08d3a5498971'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '54be545a539142d6af73344d81e37fdb'
                        deleted: true
                        key: {
                            category: 'x_extticket_v2_incident'
                            prefix: 'INC'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '55aeb49d52a04200b18beb90dba78d67'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'status'
                            value: 'resolved'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '55ba109ed7974c6f804765b7298fb19d'
                        key: {
                            name: 'x_1860385_external_incident'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5865d3245e904128a2d4a758169dcc57'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'resolved_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '59c45ff73a97497892cf5f42befd9c2f'
                        deleted: true
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
                        table: 'sys_choice'
                        id: '5e6f7b12b0104cac883ab652b0c9a0b6'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5e9973a1ee5446858bdc77ab5c538c2f'
                        deleted: true
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
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                            value: 'resolved'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '668d85b82ca64ee997f9104d8985964f'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '67b721d90ee940d7bceb5ef66142d514'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '68d4781966fc48b08cc98752b6328e9c'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6947c00ea47840f6bc6a86f61b4aa13e'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'priority'
                            value: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a1ea19538a149b3a9c46b32329b4d0a'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6a71bba8a29d4a87b30e40733a08997b'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6c6b0336d4084f3caca0ec08aa7e4067'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '6ef863e2f4b54cd4a6b955fff88e9da9'
                        deleted: true
                        key: {
                            category: 'x_ticket_mgmt_new_incident'
                            prefix: 'INC'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6f5a8eb7e11a4523be7e464c3f0ec6f0'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'status'
                            value: 'new'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '70f91307faa44401ab8da9993224457b'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'resolved_at'
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
                        table: 'sys_documentation'
                        id: '72f82fb1fb1d45238d22ea813cbe8c4f'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'resolved_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '73737d9118d5470db07986524eff24c4'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'status'
                            value: 'closed'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '75efb2ea9b344b3c8b6efc3172d130b8'
                        deleted: true
                        key: {
                            category: 'x_clone_ticketmgmt_incident'
                            prefix: 'INC'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '76caf19ef6654ed1a0dddd7326050acd'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'status'
                            value: 'closed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '797cada57055443eb077c8e376f639a5'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                            value: '1'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7983d855ce364fad8017c2215a3e786e'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'status'
                            value: 'new'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7ab5319327fc4318b5e35bacfac7d074'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7b773d89dc454b84a87d790d0ab11453'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'priority'
                            language: 'en'
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
                        table: 'sys_documentation'
                        id: '7cf80bd38e0e4b4385bff326c79ce869'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7d21773e84174a87a106e7d3d6f76c9a'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'priority'
                            value: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7dea96f98df14a30901819fe332fdf93'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                            value: '4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7f6de5fccd2b478b886354b54dd4d710'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '82ce1a5b84e647d5925e3defe24737bf'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'status'
                            value: 'new'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '83c700bada414385ba46fe9b9fdd970b'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'opened_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '84f4a3bab9da4fe59368c1ea8a531e6a'
                        deleted: true
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
                        table: 'sys_choice'
                        id: '87b5bacd90d24c8c8ee1ba102f79cf06'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'priority'
                            value: '3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8f84aa649c064fea830703002ac7a3fa'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'short_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '93b1203748cb4bf2a6569e7f49f97435'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'status'
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
                        id: '98262b1aa2814a18abd93ad361eff863'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'number'
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
                        table: 'sys_dictionary'
                        id: 'a781a85c2fa846daaec0285507945d90'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'short_description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a7b965a0447f46beb042447b46af64e3'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'priority'
                            value: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a7f790e08c0049eb88d3f9b92b997832'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'opened_at'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a887bafa9b8c4f3e8268cb37c0c6c62f'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'priority'
                            value: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'abc6c5ed15ca493596c5c08d1e8fc54f'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'description'
                            language: 'en'
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
                        id: 'aca4500f4d20450e95574e80b4184116'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aed2b93bfeda47b2be30decfae1dfc50'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'afb1f23ba5e24b9bbbbfb276d183fd90'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'status'
                            value: 'on_hold'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b1219e3b3e1847f0b8940d50303f9a55'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                            value: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b133ee986fa448a7b208e1ddc12e674f'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'b3f66930cd2d4ab69448ed022a724a5d'
                        key: {
                            category: 'x_1860385_external_incident'
                            prefix: 'INC'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'b5602e8a78d340489cf38a798bfe7182'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b5ddbe90ec454f1f86621b06aa162341'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'priority'
                            value: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b7f921ae6ca643f8865813924e0bcf29'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'status'
                            value: 'resolved'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bcf02ad6927045b7a6474109cc041d28'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bd3acc4d8e264119908eec45afddf53f'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bd7c31e611894b29b8ef4dd5906ef565'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'priority'
                            value: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bf23f19e7c9e4d68bed6a8e81be76d6d'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'description'
                            language: 'en'
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
                        table: 'sys_choice_set'
                        id: 'c40e433a1d9c485f98ca26f22762b197'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c5ebdba4e1724daf90d11129b9dd354b'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c666c6a811994e22b4f555670f56628e'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'opened_at'
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
                        table: 'sys_choice'
                        id: 'd32494d6ced64043a2f609a0d6efa9ea'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'status'
                            value: 'on_hold'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd3e4ced09b444cd6b54ad606da8545a0'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4a37219d97f42ff84907a2e78fbc83f'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd4c0c9f193514aa3bb76159be534f1dd'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5fd5d28504641308196c051bfa0e07d'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'short_description'
                            language: 'en'
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
                        id: 'd9a59976732e49ac8089a267b5fa367e'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'status'
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
                        id: 'dd760668925049eaa70c72fc54bda0a4'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'priority'
                            value: '1'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'df3ec087ff8b46229e5215223865e6ab'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'df5fe161d64e45cb939ea1ad83994183'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e1428cac42d8421493506f0391c90531'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'priority'
                            value: '1'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e1d66103438747bdb3127c948672b809'
                        deleted: true
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
                        deleted: true
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
                        table: 'sys_choice_set'
                        id: 'e9273ccfd4984169be27bb8ac02b9920'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'eb03d2d20d2a404299044390ffab3f47'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ef6838a983ae40a2b68f9ab21e9e12a6'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ef90249d9b794b55a0fa54668c1d1d9b'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'opened_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f1bdfb412e034efcba9f141caa547984'
                        deleted: true
                        key: {
                            name: 'x_ticket_mgmt_new_incident'
                            element: 'status'
                            value: 'resolved'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f2fd006f8ae64de9b7d6cc9f3a7b4ca3'
                        key: {
                            name: 'x_1860385_external_incident'
                            element: 'status'
                            value: 'on_hold'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f37843a301944134b962641c02ade124'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'description'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'f646ad35b85144b1b0767be74671b6b6'
                        key: {
                            name: 'x_1860385_external_incident'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f9859222d5ef441088923aa712658349'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'faf1fc34ed6c4a7094f594aebbc0e92c'
                        deleted: true
                        key: {
                            name: 'x_clone_ticketmgmt_incident'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fc53b3869eff48c383cbecaf66da4c09'
                        deleted: true
                        key: {
                            name: 'x_extticket_v2_incident'
                            element: 'short_description'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
