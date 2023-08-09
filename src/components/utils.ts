export function display(classElement: string | Element, classParent: string, toggleClass: string): void { 
    const element = typeof classElement==='string'? 
        document.querySelector('.'+classElement) : classElement
    const condition = element?.className?.includes(toggleClass)
    const parent = document.querySelector('.'+classParent)?.children
    if (parent && toggleClass === 'hidden') {
        for (let indice of Array.from(parent)) {
            indice.classList.add(toggleClass)
        }

    } else if (parent) {
        for (let indice of Array.from(parent)) {
            indice.classList.remove(toggleClass)
        }
    }

    if (condition && toggleClass === 'hidden') { element?.classList?.remove(toggleClass) }
    else if (!condition && toggleClass !== 'hidden') { element?.classList?.add(toggleClass) }

}


export function path(type: string | undefined, title: string | undefined, original: string | undefined) { 
    const route = type===undefined? type : 
        type==='movie'? 'filme' : 'serie'

    title = strip(title)?.replaceAll(' ', '-')
    original = strip(original)?.replaceAll(' ', '-')
    const production = title ?? original

    if (route && production) { return '/'+route+'/'+production }
    else { return '/' }

}


export function strip(s: string | undefined) {
    return s?.toLowerCase().replaceAll(".", "").replaceAll(":", "").replaceAll(",", "").replaceAll('-', '')
}










/*

declare global {
  interface Window {
    YT: {
      Player: typeof Player;
    };
  }
}

*/


export class YTAPI { 
    public status = false
    public visibility = false
    public player: YT.Player | undefined

    initializeYouTubeAPI() { 
        if (!this.status) { 
            this.status = true
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
            //window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this)
            
        }

        //alert('dada')
    }

    onYouTubeIframeAPIReady() { 
        const container = document.getElementById('player')
        const videoKey = container?.getAttribute('data-video-key')

        if (videoKey) { 
            this.visibility = true
            this.player = new YT.Player('player', { 
                videoId: videoKey,
                playerVars: { 
                    autoplay: 1,
                    autohide: 1,
                    controls: 0,
                    rel: 0,
                    showinfo: 0,
                    enablejsapi: 1
                },

                events: {
                    'onStateChange': this.onPlayerStateChange.bind(this)
                }
            } )

            
        }

        
    }


    private onPlayerStateChange(event: any) { 
        if (event.data === YT.PlayerState.ENDED) { 
            this.close()
        }
    }

    replay() {
        let element: HTMLElement | null | undefined = document.querySelector('iframe#player')?.parentElement
        if (element) {
            element.style.display = ''
            this.visibility = true
            this.player?.playVideo()
        }
    }

    close() {
        let element: HTMLElement | null | undefined = document.querySelector('iframe#player')?.parentElement
        if (element) {
            element.style.display = 'none'
            this.visibility = false
        }
    }
}
