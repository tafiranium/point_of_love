class App {

    constructor(args) {
        this.config    = args["config"] 
        this.scanr     = args["scanr"]
        this.html      = args["html"]
        this.start_key = args["start_key"]
        this.main()
    }

    async get_file(salt, type=true) {
        let response  =                                 await fetch(window.atob(this.start_key) + salt);
        if (response.ok) {if (type) {return await response.json();} else {return await response.text();}
        } else                                          {console.log("Ошибка HTTP: " + response.status)}
    }

    t(type_of_page) {return this.cfg["type_settings"][type_of_page][2]}

    async main() {

        this.cfg = get_localJson_if_exists_else_insert("config", await this.get_file("settings.new"))

        this.templates = get_localJson_if_exists_else_insert("templates_for_scaning", {
            all_list: Object.assign({}, this.t("buyer"), this.t("market"), this.t("mobile"), this.t("takeup")),
            uv_off: Object.assign({}, this.t("market"), this.t("mobile"), this.t("takeup")),
            need: {traffic: ["open", "return"], comment: ["market", "mobile", "takeup", "return"], reasons: ["no_item"]},
            icons: [["ฅ^•⩊•^ฅ", "⎛⎝^>⩊<^⎠⎞"], "≽/ᐠ - ˕ -マ≼"] })
        
        this.deny = get_localJson_if_exists_else_insert("deny", ["Не задан", ""])
        
        if (this.scanr == false) {
            let url = window.location.href
            let pref_url = get_local_if_exists_else_insert("pref_url", url)
            this.same_url = (url == pref_url)
        }

        this.interface         = new Interface(this.html)

        console.log((!this.same_url))

        this.tables            = (!this.same_url) ? (new Tables(this.cfg, this.html).get_all()): (get_localJson_if_exists_else_insert(
            "all_tables", (new Tables(this.cfg, this.html)).get_all())
        )

        console.log(this.tables)

        this.all_tables_sorted = [this.tables[0]["table_sorted"], this.tables[1]["temp"], this.tables[2]["items"]]

        this.traffic  = this.all_tables_sorted[0]["traffic"]
        this.comment  = this.all_tables_sorted[0]["comment"]
        this.reasons  = this.all_tables_sorted[0]["reason"]

        this.datetime = new VpTime(this.all_tables_sorted[0]["datetime"].split(", "))

        let analis_settings = {
            tables:     this.all_tables_sorted, 
            all_list:   this.templates["all_list"],
            config:     this.cfg,
            html:       this.html,
            scanr:      this.scanr,
            interface:  this.interface,
            templates:  this.templates,
            deny:       this.deny
        }

        if (this.scanr) { 

            console.log("----SCANR----")

            this.analysis = new AnalIs(analis_settings)
            this.uv_turn  = this.analysis.uv_turn 
            this.type_of_page = this.analysis.type_of_page[0]
            
        } else {

            console.log("----MAIN----")

            analis_settings["datetime"] = this.datetime
            this.analysis = new AnalIs(analis_settings)
            this.uv_turn  = this.analysis.uv_turn 
            this.type_of_page = this.analysis.type_of_page

            this.copy_class = new CopyConnect({

                html:              this.html,
                type_of_page:      this.type_of_page,
                interface:         this.interface,
                all_tables_sorted: this.all_tables_sorted[0]["table_sorted"],

                traffic:           this.traffic,
                comment:           this.comment,
                reasons:           this.reasons,

                analis:            this.analysis,
                deny:              this.deny,
                templates:         this.templates

            })
        }
    }
}

const TL_APP = new App({start_key: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3RhZmlyYW5pdW0vdGxfYXBwL21haW4v', 
    html: document.body, scanr: false, config: false})

console.log(TL_APP)
