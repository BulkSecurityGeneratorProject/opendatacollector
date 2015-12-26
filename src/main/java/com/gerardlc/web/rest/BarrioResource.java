package com.gerardlc.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gerardlc.domain.Barrio;
import com.gerardlc.repository.BarrioRepository;
import com.gerardlc.web.rest.util.HeaderUtil;
import com.gerardlc.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Barrio.
 */
@RestController
@RequestMapping("/api")
public class BarrioResource {

    private final Logger log = LoggerFactory.getLogger(BarrioResource.class);
        
    @Inject
    private BarrioRepository barrioRepository;
    
    /**
     * POST  /barrios -> Create a new barrio.
     */
    @RequestMapping(value = "/barrios",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Barrio> createBarrio(@RequestBody Barrio barrio) throws URISyntaxException {
        log.debug("REST request to save Barrio : {}", barrio);
        if (barrio.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("barrio", "idexists", "A new barrio cannot already have an ID")).body(null);
        }
        Barrio result = barrioRepository.save(barrio);
        return ResponseEntity.created(new URI("/api/barrios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("barrio", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /barrios -> Updates an existing barrio.
     */
    @RequestMapping(value = "/barrios",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Barrio> updateBarrio(@RequestBody Barrio barrio) throws URISyntaxException {
        log.debug("REST request to update Barrio : {}", barrio);
        if (barrio.getId() == null) {
            return createBarrio(barrio);
        }
        Barrio result = barrioRepository.save(barrio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("barrio", barrio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /barrios -> get all the barrios.
     */
    @RequestMapping(value = "/barrios",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Barrio>> getAllBarrios(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Barrios");
        Page<Barrio> page = barrioRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/barrios");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /barrios/:id -> get the "id" barrio.
     */
    @RequestMapping(value = "/barrios/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Barrio> getBarrio(@PathVariable Long id) {
        log.debug("REST request to get Barrio : {}", id);
        Barrio barrio = barrioRepository.findOne(id);
        return Optional.ofNullable(barrio)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /barrios/:id -> delete the "id" barrio.
     */
    @RequestMapping(value = "/barrios/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteBarrio(@PathVariable Long id) {
        log.debug("REST request to delete Barrio : {}", id);
        barrioRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("barrio", id.toString())).build();
    }
}
