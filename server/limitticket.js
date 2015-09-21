/**
Ticket based rate-limiter, similar to github API
(infact we borrow their ratelimit headers)
*/
module.exports = function(_opts){
    var opts = {
        cache: null,    // Ratelimit cache name, use to denote 
                        // different rate limiting to clients.
        whitelist:[],   // Allow these IP addresses to bypass limit
        blacklist:[],   // Deny these IP addresses permanently
        ticketTime: 60, // How long a ticket lives for.
        maxTickets: 15, // Max tickets an IP address can hold
        maxStrikes: 15, // Max times an IP can hit the endpoint after
                        // using all tickets before being blacklisted
        expiredHandler: function(req, res){
            res.sendStatus(429).end('See X-RateLimit-* headers for better rate-limit handling.');
        } //Connect Handler to invoke on ticket expiry.
    };
    for(x in (_opts||{})){opts[x] = _opts[x];}


    var tickets = {};


    return function(req, res, next){
        if(opts.whitelist.indexOf(req.ip) != -1){
            next();
            return;
        }
        if(opts.blacklist.indexOf(req.ip) != -1){
            res.sendStatus(403).end("IP BLACKLISTED");
            return;
        }
        //Init tickets if needed
        if(!tickets[req.ip]){
            tickets[req.ip] = {
                tickets:[],
                strikes:0
            };
        }
        var ticket = tickets[req.ip];
        //Clean expired tickets
        var now = Math.floor(Date.now()/1000);
        if(ticket.tickets.length > 0){
            ticket.tickets = ticket.tickets.filter(function(t){ return t > now});
        }

        //Add new ticket if below max.
        var ticketed = false;
        if(ticket.tickets.length < opts.maxTickets){
            ticket.tickets.push(now + opts.ticketTime);
            ticket.strikes = Math.max(0, ticket.strikes - 1);
            ticketed = true;
        }

        //Set headers
        if(opts.cache){
            res.set('X-RateLimit-cache', opts.cache);
        }
        res.set('X-RateLimit-Limit', opts.maxTickets);
        res.set('X-RateLimit-Remaining', Math.max(0,opts.maxTickets - ticket.tickets.length))
        res.set('X-RateLimit-Reset', ticket.tickets[0]);

        //If tickets exceeded, send expiredHandler
        //Else continue
        if(ticket.tickets.length >= opts.maxTickets && !ticketed){
            //Mark a strike against this IP, excessive strikes results in auto blacklisting.
            ticket.strikes ++;
            if(ticket.strikes > opts.maxStrikes){
                opts.blacklist.push(req.ip);
                console.log("BLACKLISTED",req.ip);
            }
            opts.expiredHandler(req,res);
        }else{
            next();
        }


    }
}
