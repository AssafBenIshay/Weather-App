import ERROR from "./assets/images/icon-error.svg"
import RETRY from "./assets/images/icon-retry.svg"


export default function ApiError({handleRetry}) {
    
     return (
				<>
					<div className="api-error">
						<img src={ERROR} alt='error'/>
						<h1>Something went wrong</h1>
						<p>
							We couldn't connect to the server (API error). Please try
							<br /> again in a few moments.
						</p>
						<button onClick={handleRetry}>
							<img src={RETRY} alt='retry'/>
							Retry
						</button>
					</div>
				</>
			)
}