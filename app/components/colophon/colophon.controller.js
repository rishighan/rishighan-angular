class ColophonController {
    constructor(PostService,
                $translate) {
        this._PostService = PostService;
        this._$translate = $translate;
        this.colophonData = {};
        this.colophonJsonLd = {};
        this.fetchColophon();
    }

    setColophonData(data) {
        this.colophonData = data;
    }

    setColophonJsonLd(jsonLd) {
        this.colophonJsonLd = jsonLd;
    }

    fetchColophon() {
        this._PostService.getPostsByTagName('colophon', 1, 1)
            .then((data) => {
                this.setColophonData(data.data.docs);
                this.setColophonJsonLd({
                    "@context": "http://schema.org/",
                    "@type": "Person",
                    "name": this._$translate.instant('colophon.author_name.fragment'),
                    "jobTitle": this._$translate.instant('colophon.job_title.fragment'),
                    "url": this._$translate.instant('colophon.website.fragment')
                });
            });
    }
}

export default ColophonController;