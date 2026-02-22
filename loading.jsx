import React, { useEffect, useState } from 'react'
import './loading.css'

const randomChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*()<>?[]{}~'

function MatrixColumn({ rows = 40, delay = 0 }) {
	const chars = React.useMemo(() => {
		return Array.from({ length: rows }, () => randomChars[Math.floor(Math.random() * randomChars.length)])
	}, [rows])

	return (
		<div className="matrix-col" style={{ animationDelay: `${delay}ms` }}>
			{chars.map((c, i) => (
				<span key={i}>{c}</span>
			))}
		</div>
	)
}

export default function Loading({ onFinish } = {}) {
	const [phase, setPhase] = useState(1)
	const [typed, setTyped] = useState('')
	const [exiting, setExiting] = useState(false)
	const [prevPhase, setPrevPhase] = useState(null)
	const [transitioning, setTransitioning] = useState(false)

	const initText = '> INITIATING CYNET OVERRIDE....'
	const bypassText = '> BYPASSING ENCRYPTION... [OK]'

	useEffect(() => {
		let mounted = true
		let idx = 0
		let typingTimer = null

		function typeChar() {
			if (!mounted) return
			if (idx < initText.length) {
				setTyped((s) => s + initText[idx])
				idx++
				typingTimer = setTimeout(typeChar, 40)
			}
		}

		typeChar()

		function switchPhase(next) {
			if (!mounted) return
			setPrevPhase((p) => p ?? phase)
			setPhase(next)
			setTransitioning(true)
			setTimeout(() => {
				if (!mounted) return
				setPrevPhase(null)
				setTransitioning(false)
			}, 480)
		}

		const tPhase2 = setTimeout(() => {
			if (!mounted) return
			switchPhase(2)
			setTyped(bypassText)
		}, 2000)

		const tPhase3 = setTimeout(() => {
			if (!mounted) return
			switchPhase(3)
		}, 4000)

		const tExitStart = setTimeout(() => {
			if (!mounted) return
			setExiting(true)
		}, 5000)

		const tFinish = setTimeout(() => {
			if (!mounted) return
			if (onFinish) onFinish()
		}, 5700)

		return () => {
			mounted = false
			clearTimeout(typingTimer)
			clearTimeout(tPhase2)
			clearTimeout(tPhase3)
			clearTimeout(tExitStart)
			clearTimeout(tFinish)
		}
	}, [onFinish])

	if (!exiting && phase === null) return null

	function renderPhase(p) {
		if (p === 1) return (
			<>
				<div className="terminal-line">
					<span className="typed">{typed}</span>
					<span className={`cursor ${phase === 1 ? 'fast' : 'normal'}`}>█</span>
				</div>
				<div className="red-box glitch shake" data-text="ACCESS DENIED: FIREWALL DETECTED"></div>
			</>
		)
		if (p === 2) return (
			<>
				<div className="terminal-line">
					<span className="typed">{typed}</span>
					<span className={`cursor ${phase === 2 ? 'fast' : 'normal'}`}>█</span>
				</div>
				<div className="phase-two">
					<div className="matrix-grid" aria-hidden>
						{Array.from({ length: 36 }).map((_, i) => (
							<MatrixColumn key={i} rows={40} delay={(i % 7) * 120} />
						))}
					</div>
					<div className="bypass-text chroma">{bypassText}</div>
				</div>
			</>
		)
		if (p === 3) return (
			<>
				<div className="white-flash" />
				<div className="welcome chroma welcome-neo">
					<div className="welcome-sub" data-text="WELCOME TO"><span className="welcome-sub-inner">WELCOME TO</span></div>
					<div className="welcome-main" data-text="CYNET"><span className="welcome-main-inner">CYNET</span></div>
				</div>
			</>
		)
		return null
	}

	return (
		<div className={`loading-overlay ${exiting ? 'exiting' : ''}`}>
			<div className="crt-overlay" />
			<div className="power-flicker" />

			<div className="center">
				<div className="terminal">
					<div className={`phase-stack ${transitioning ? 'transitioning' : ''}`}>
						{prevPhase !== null && (
							<div className={`phase-content prev phase-${prevPhase} glitch-out`}>
								{renderPhase(prevPhase)}
							</div>
						)}

						<div className={`phase-content current phase-${phase} ${transitioning ? 'glitch-in' : ''}`}>
							{renderPhase(phase)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

